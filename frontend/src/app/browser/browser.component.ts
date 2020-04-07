import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {RestService} from '../api/rest.service';
import {DataFile} from '../classes/DataFile';

declare var WaveSurfer: any;

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit, AfterViewInit {

  constructor(private rs: RestService) {}

  dataFiles: DataFile[] = [];
  renderers: any[] = [];

  @ViewChildren('fileTile') cards: QueryList<any>;

  ngOnInit() {
    this.rs.getDataFiles().subscribe(
      (response) => {
        this.dataFiles = response;
        this.renderers = [response.length];
      },
      (error) => {
        console.log('No Data Found' + error);
      }
    );
  }

  ngAfterViewInit() {
    this.cards.changes.subscribe(t => {
      this.loadFiles();
    });
  }

  loadFiles() {
    this.dataFiles.forEach((value, index) => {
      if (value.type === 'audio') {
        this.loadAudioFile(index);
      }
    });
  }

  loadAudioFile(index) {
    const filename = this.dataFiles[index].name;
    this.renderers[index] = WaveSurfer.create({
      container: '#waveform_' + filename.substr(0, 11),
      waveColor: '#404040',
      height: 120,
      responsive: true,
      hideScrollBar: true,
      progressColor: 'hsl(210, 79%, 46%)',
      cursorColor: '#707070',
      normalize: true,
      barWidth: 2,
      barMinHeight: 1
    });
    this.renderers[index].load('http://127.0.0.1:5000/static/' + filename);
  }

  playPause(index) {
    this.renderers[index].playPause();
  }

  selectFile(file: DataFile) {
    document.location.href = `/processor?file=${file.name}`;
  }
}
