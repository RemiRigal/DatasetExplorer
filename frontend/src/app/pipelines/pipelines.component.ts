import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataFile} from '../classes/DataFile';
import {MatSidenav} from '@angular/material/sidenav';
import {DataPlugin} from '../classes/DataPlugin';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.scss'],
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
export class PipelinesComponent implements OnInit, AfterViewInit {

  @ViewChild('inspectorDrawer') inspectorDrawer: MatSidenav;
  DataFile = DataFile;
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
