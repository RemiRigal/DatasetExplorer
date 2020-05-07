import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {RestService} from '../api/rest.service';
import {DataFile} from '../classes/DataFile';
import {ActivatedRoute} from '@angular/router';
import {DataPlugin} from '../classes/DataPlugin';
import {CustomStorage} from '../utils/CustomStorage';


@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.css']
})
export class ProcessorComponent implements OnInit, AfterViewInit {

  constructor(private rs: RestService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
        this.filename = params['file'];
    });
  }

  filename: string;
  file: DataFile;
  processed: DataFile[] = [];
  processedIndex: Map<string, number> = new Map<string, number>();

  cardHeight = CustomStorage.getCardHeight();
  cardWidth = CustomStorage.getCardWidth();

  ngOnInit() {
    this.rs.getDataFile(this.filename).subscribe(
      (response) => {
        this.file = response;
        this.processed.push(this.file);
      },
      (error) => {
        console.log('File Not Found' + error);
      }
    );
  }

  ngAfterViewInit() { }

  onProcess(plugin: DataPlugin) {
    const tempFile = new DataFile(plugin.className, plugin.name, 0, '', plugin.outType, '');
    const count = this.processed.push(tempFile);
    this.processedIndex.set(plugin.name, count - 1);
    const params = CustomStorage.getPluginParams(plugin.className);
    this.rs.applyPlugin(plugin.className, this.file.name, params).subscribe((response) => {
      this.processed.splice(this.processedIndex.get(plugin.name), 1, response);
    });
  }
}
