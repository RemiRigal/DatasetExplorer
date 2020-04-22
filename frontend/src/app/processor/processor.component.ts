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

  cardHeightValue = CustomStorage.getCardHeight();
  cardWidthValue = CustomStorage.getCardWidth();

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
    const tempFile = new DataFile(plugin.className, plugin.name, 0, '', plugin.outType, '');
    const count = this.processed.push(tempFile);
    this.processedIndex.set(plugin.name, count - 1);
    this.rs.applyPlugin(plugin.className, this.file.name).subscribe((response) => {
      this.processed.splice(this.processedIndex.get(plugin.name), 1, response);
    });
  }

  get cardWidth() {
    return this.cardWidthValue;
  }

  set cardWidth(width) {
    this.cardWidthValue = width;
    if (!this.file) {
      return;
    }
    this.processed.concat([this.file]).forEach(file => {
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
    if (!this.file) {
      return;
    }
    this.processed.concat([this.file]).forEach(file => {
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
