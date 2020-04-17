import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {RestService} from '../api/rest.service';
import {DataFile} from '../classes/DataFile';
import {ActivatedRoute} from '@angular/router';
import {DataPlugin} from '../classes/DataPlugin';


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

  ngOnInit() {
    this.rs.getDataFile(this.filename).subscribe(
      (response) => {
        this.file = response[0];
      },
      (error) => {
        console.log('File Not Found' + error);
      }
    );
  }

  ngAfterViewInit() { }

  onProcess(plugin: DataPlugin) {
    this.rs.applyPlugin(plugin.name, this.file.name).subscribe((response) => {
      this.processed.push(response);
    });
  }
}
