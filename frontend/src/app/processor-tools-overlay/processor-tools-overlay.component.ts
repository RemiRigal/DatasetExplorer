import {Component, EventEmitter, Inject, Input, OnInit} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';
import {PROCESSOR_TOOLS_OVERLAY_DATA} from './processor-tools-overlay.tokens';
import {DataPlugin} from '../classes/DataPlugin';
import {CustomStorage} from '../utils/CustomStorage';

@Component({
  selector: 'app-processor-tools-overlay',
  templateUrl: './processor-tools-overlay.component.html',
  styleUrls: ['./processor-tools-overlay.component.css']
})
export class ProcessorToolsOverlayComponent implements OnInit {

  @Input() selectText = 'Ok';
  @Input() saveParams = false;

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

  componentInstance: ProcessorToolsOverlayComponent;
  onClose = new EventEmitter();

  constructor(private overlayRef: OverlayRef) { }

  close() {
    this.onClose.emit();
    this.overlayRef.dispose();
  }
}
