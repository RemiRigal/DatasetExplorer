import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {RestService} from '../api/rest.service';
import {DataFile} from '../classes/DataFile';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  constructor(private rs: RestService) {}

  dataFiles: DataFile[] = [];
  heightFactor = parseInt(localStorage.getItem('browserHeightFactor'), 10) || 120;
  zoomFactor = parseInt(localStorage.getItem('browserZoomFactor'), 10) || 25;

  ngOnInit() {
    this.rs.getDataFiles().subscribe(
      (response) => {
        this.dataFiles = response;
      },
      (error) => {
        console.log('No Data Found' + error);
      }
    );
  }

  onZoomFactorChanged() {
    this.dataFiles.forEach(file => {
      if (file.previewRenderer && DataFile.isAudio(file)) {
        file.previewRenderer._onResize();
      }
    });
    localStorage.setItem('browserZoomFactor', this.zoomFactor + '');
  }

  onHeightFactorChanged() {
    this.dataFiles.forEach(file => {
      if (DataFile.isImage(file)) {
        console.log(file.previewRenderer);
      }
      if (file.previewRenderer) {
        if (DataFile.isAudio(file)) {
          file.previewRenderer.setHeight(this.heightFactor);
        } else if (DataFile.isImage(file)) {
          file.previewRenderer.style.height = this.heightFactor + 'px';
          file.previewRenderer.firstChild.style.height = (this.heightFactor - 4) + 'px';
        }
      }
    });
    localStorage.setItem('browserHeightFactor', this.heightFactor + '');
  }
}
