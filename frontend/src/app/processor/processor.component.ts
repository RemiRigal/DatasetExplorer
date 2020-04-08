import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {RestService} from '../api/rest.service';
import {DataFile} from '../classes/DataFile';
import {ActivatedRoute} from '@angular/router';

declare var WaveSurfer: any;

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

  @ViewChildren('mainCard') mainCard: QueryList<any>;

  filename: string;
  dataFile: DataFile;
  waveSurfer: any;

  ngOnInit() {
    this.rs.getDataFile(this.filename).subscribe(
      (response) => {
        this.dataFile = response[0];
      },
      (error) => {
        console.log('File Not Found' + error);
      }
    );
  }

  ngAfterViewInit() {
    this.mainCard.changes.subscribe(t => {
      this.waveSurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#404040',
        height: 200,
        responsive: true,
        hideScrollBar: true,
        progressColor: 'hsl(210, 79%, 46%)',
        cursorColor: '#707070',
        normalize: true,
        barWidth: 1,
        barMinHeight: 1
      });
      this.waveSurfer.load('http://127.0.0.1:5000/static/' + this.filename);
    });
  }

  playPause() {
    this.waveSurfer.playPause();
  }

}
