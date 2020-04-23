import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {RestService} from '../api/rest.service';
import {DataFile} from '../classes/DataFile';
import {CustomStorage} from '../utils/CustomStorage';
import {VirtualScrollerComponent} from 'ngx-virtual-scroller';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  @ViewChild(VirtualScrollerComponent)
  virtualScroller: VirtualScrollerComponent;

  constructor(private rs: RestService) {}

  dataFiles: DataFile[] = [];
  cardHeight = CustomStorage.getCardHeight();
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

  trackByFileId(index, file) {
    return file.id;
  }

  get cardWidth() {
    return this.cardWidthValue;
  }

  set cardWidth(width) {
    this.cardWidthValue = width;
    if (this.virtualScroller) {
      const startIndex = this.virtualScroller.viewPortInfo.startIndex;
      this.virtualScroller.invalidateAllCachedMeasurements();
      this.virtualScroller.scrollToIndex(startIndex, true, 0, 0);
    }
  }
}
