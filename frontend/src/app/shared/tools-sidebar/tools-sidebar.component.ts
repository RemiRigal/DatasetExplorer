import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {RestService} from '../../api/rest.service';
import {DataPlugin} from '../../scripts/classes/DataPlugin';
import {ToolsSidebarOverlayService} from '../tools-sidebar-overlay/tools-sidebar-overlay.service';
import {ProcessorToolsOverlayRef} from '../tools-sidebar-overlay/tools-sidebar-overlay.component';
import {LocalStorageProfile} from '../tools-parameters/tools-parameters.component';

@Component({
  selector: 'app-tools-sidebar',
  templateUrl: './tools-sidebar.component.html',
  styleUrls: ['./tools-sidebar.component.css']
})
export class ToolsSidebarComponent implements OnInit {

  @Input() dataFileType: string = null;
  @Input() selectText = 'Ok';
  @Input() localStorageProfile: LocalStorageProfile = LocalStorageProfile.None;
  @Output() dataPluginClick = new EventEmitter();

  @ViewChildren('toolsButtons', {read: ElementRef}) toolsButtons: QueryList<ElementRef>;

  constructor(private rs: RestService, private processorToolsOverlay: ToolsSidebarOverlayService) { }

  plugins: DataPlugin[];
  currentToolOverlay: ProcessorToolsOverlayRef = null;
  toolOverlayIndex: number = undefined;

  ngOnInit(): void {
    this.rs.getPlugins().subscribe(
      (response) => {
        this.plugins = response;
        if (this.dataFileType !== null) {
          this.plugins = this.plugins.filter(value => {
            return value.inType.length === 1 && value.inType[0] === this.dataFileType;
          });
        }
      },
      (error) => {
        console.log('No Plugins Found' + error);
      }
    );
  }

  openPluginOverlay(i) {
    if (this.toolOverlayIndex === i) {
      return;
    }
    if (this.currentToolOverlay !== null) {
      this.currentToolOverlay.close();
    }
    this.toolOverlayIndex = i;
    this.currentToolOverlay = this.processorToolsOverlay.open(this.toolsButtons.toArray()[i], this.plugins[i], this.localStorageProfile, this.selectText);
    this.currentToolOverlay.onClose.subscribe(_ => {
      this.toolOverlayIndex = undefined;
    });
    this.currentToolOverlay.componentInstance.onApplyPlugin.subscribe(plugin => {
      this.dataPluginClick.emit(plugin);
      this.currentToolOverlay.close();
    });
  }
}
