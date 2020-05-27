import {ComponentRef, ElementRef, Injectable, Injector} from '@angular/core';
import {ToolsSidebarOverlayComponent, ProcessorToolsOverlayRef} from './tools-sidebar-overlay.component';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {PROCESSOR_TOOLS_OVERLAY_DATA} from './tools-sidebar-overlay.tokens';
import {DataPlugin} from '../../scripts/classes/DataPlugin';
import {LocalStorageProfile} from '../tools-parameters/tools-parameters.component';

@Injectable()
export class ToolsSidebarOverlayService {

  constructor(private injector: Injector, private overlay: Overlay) { }

  open(elementRef: ElementRef, plugin: DataPlugin, localStorageProfile: LocalStorageProfile = LocalStorageProfile.None, selectText = 'Ok'): ProcessorToolsOverlayRef {
    const overlayRef = this.createOverlay(elementRef);
    const toolsOverlayRef = new ProcessorToolsOverlayRef(overlayRef);
    const injector = this.createInjector(toolsOverlayRef, plugin);
    toolsOverlayRef.componentInstance = this.attachDialogContainer(overlayRef, injector);
    toolsOverlayRef.componentInstance.localStorageProfile = localStorageProfile;
    toolsOverlayRef.componentInstance.selectText = selectText;
    overlayRef.backdropClick().subscribe(_ => toolsOverlayRef.close());
    return toolsOverlayRef;
  }

  createOverlay(elementRef: ElementRef) {
    const positionStrategy = this.overlay.position().flexibleConnectedTo(elementRef).withPositions([{
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
        offsetX: 1
    }]);
    return this.overlay.create({
      width: '400px',
      hasBackdrop: true,
      backdropClass: 'processor-overlay-backdrop',
      panelClass: 'tm-file-preview-dialog-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });
  }

  attachDialogContainer(overlayRef: OverlayRef, injector: Injector): ToolsSidebarOverlayComponent {
    const processorToolsPortal = new ComponentPortal(ToolsSidebarOverlayComponent, null, injector);
    const containerRef: ComponentRef<ToolsSidebarOverlayComponent> = overlayRef.attach(processorToolsPortal);
    return containerRef.instance;
  }

  private createInjector(toolsOverlayRef: ProcessorToolsOverlayRef, plugin: DataPlugin): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(ProcessorToolsOverlayRef, toolsOverlayRef);
    injectionTokens.set(PROCESSOR_TOOLS_OVERLAY_DATA, plugin);
    return new PortalInjector(this.injector, injectionTokens);
  }
}
