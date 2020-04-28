import {ComponentRef, ElementRef, Injectable, Injector} from '@angular/core';
import {ProcessorToolsOverlayComponent, ProcessorToolsOverlayRef} from './processor-tools-overlay.component';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {PROCESSOR_TOOLS_OVERLAY_DATA} from './processor-tools-overlay.tokens';
import {DataPlugin} from '../classes/DataPlugin';

@Injectable()
export class ProcessorToolsOverlayService {

  constructor(private injector: Injector, private overlay: Overlay) { }

  open(elementRef: ElementRef, plugin: DataPlugin): ProcessorToolsOverlayRef {
    const overlayRef = this.createOverlay(elementRef);
    const toolsOverlayRef = new ProcessorToolsOverlayRef(overlayRef);
    const injector = this.createInjector(toolsOverlayRef, plugin);
    toolsOverlayRef.componentInstance = this.attachDialogContainer(overlayRef, injector);
    overlayRef.backdropClick().subscribe(_ => toolsOverlayRef.close());
    return toolsOverlayRef;
  }

  createOverlay(elementRef: ElementRef) {
    const positionStrategy = this.overlay.position().flexibleConnectedTo(elementRef).withPositions([{
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
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

  attachDialogContainer(overlayRef: OverlayRef, injector: Injector): ProcessorToolsOverlayComponent {
    const processorToolsPortal = new ComponentPortal(ProcessorToolsOverlayComponent, null, injector);
    const containerRef: ComponentRef<ProcessorToolsOverlayComponent> = overlayRef.attach(processorToolsPortal);
    return containerRef.instance;
  }

  private createInjector(toolsOverlayRef: ProcessorToolsOverlayRef, plugin: DataPlugin): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(ProcessorToolsOverlayRef, toolsOverlayRef);
    injectionTokens.set(PROCESSOR_TOOLS_OVERLAY_DATA, plugin);
    return new PortalInjector(this.injector, injectionTokens);
  }
}
