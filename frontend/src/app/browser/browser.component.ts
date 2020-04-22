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
  cardHeight = CustomStorage.getCardHeight();
  cardWidth = CustomStorage.getCardWidth();

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
}
