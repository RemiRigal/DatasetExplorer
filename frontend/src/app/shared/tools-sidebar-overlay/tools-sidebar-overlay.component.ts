import {Component, EventEmitter, Inject, Input, OnInit} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';
import {PROCESSOR_TOOLS_OVERLAY_DATA} from './tools-sidebar-overlay.tokens';
import {DataPlugin} from '../../scripts/classes/DataPlugin';
import {CustomStorage} from '../../scripts/utils/CustomStorage';
import {LocalStorageProfile} from '../tools-parameters/tools-parameters.component';

@Component({
  selector: 'app-tools-sidebar-overlay',
  templateUrl: './tools-sidebar-overlay.component.html',
  styleUrls: ['./tools-sidebar-overlay.component.css']
})
export class ToolsSidebarOverlayComponent implements OnInit {

  @Input() selectText = 'Ok';
  @Input() localStorageProfile: LocalStorageProfile = LocalStorageProfile.None;

  constructor(private overlayRef: ProcessorToolsOverlayRef, @Inject(PROCESSOR_TOOLS_OVERLAY_DATA) public plugin: DataPlugin) {}

  public onApplyPlugin = new EventEmitter<DataPlugin>();
  params = {};

  ngOnInit(): void {
    this.params = CustomStorage.getPluginParams();
  }

  applyPlugin() {
    this.onApplyPlugin.emit(this.plugin);
  }
}

export class ProcessorToolsOverlayRef {

  componentInstance: ToolsSidebarOverlayComponent;
  onClose = new EventEmitter();

  constructor(private overlayRef: OverlayRef) { }

  close() {
    this.onClose.emit();
    this.overlayRef.dispose();
  }
}
