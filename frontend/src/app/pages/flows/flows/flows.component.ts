import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataFile} from '../../../scripts/classes/DataFile';
import {MatSidenav} from '@angular/material/sidenav';
import {DataPlugin} from '../../../scripts/classes/DataPlugin';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {LocalStorageProfile} from '../../../shared/tools-parameters/tools-parameters.component';

@Component({
  selector: 'app-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(300)
      ]),
      transition(':leave',
        animate(300, style({opacity: 0})))
    ])
  ]
})
export class FlowsComponent implements OnInit, AfterViewInit {

  @ViewChild('inspectorDrawer') inspectorDrawer: MatSidenav;
  DataFile = DataFile;
  LocalStorageProfile = LocalStorageProfile;
  currentNodeEdit = null;
  isReady = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isReady = true;
    });
  }

  openNodeEditDrawer(node) {
    this.currentNodeEdit = node;
    this.inspectorDrawer.toggle();
  }

  validateInspectorChanges() {
    this.currentNodeEdit.data.params = DataPlugin.getParametersObject(this.currentNodeEdit.data.plugin);
    this.inspectorDrawer.close();
    this.currentNodeEdit = null;
  }
}
