import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {RestService} from '../api/rest.service';
import {DataFile} from '../classes/DataFile';
import {CustomStorage} from '../utils/CustomStorage';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  constructor(private rs: RestService) {}

  dataFiles: DataFile[] = [];
  cardHeightValue = CustomStorage.getCardHeight();
  cardWidthValue = CustomStorage.getCardWidth();

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

  get cardWidth() {
    return this.cardWidthValue;
  }

  set cardWidth(width) {
    this.cardWidthValue = width;
    this.dataFiles.forEach(file => {
      if (file.previewRenderer && DataFile.isAudio(file)) {
        file.previewRenderer._onResize();
      }
    });
  }

  get cardHeight() {
    return this.cardHeightValue;
  }

  set cardHeight(height) {
    this.cardHeightValue = height;
    this.dataFiles.forEach(file => {
      if (file.previewRenderer) {
        if (DataFile.isAudio(file)) {
          file.previewRenderer.setHeight(this.cardHeightValue);
        } else if (DataFile.isImage(file)) {
          file.previewRenderer.style.height = this.cardHeightValue + 'px';
          file.previewRenderer.firstChild.style.height = (this.cardHeightValue - 4) + 'px';
        }
      }
    });
  }
}
