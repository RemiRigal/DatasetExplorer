import {Component, Input, OnInit} from '@angular/core';
import {DataFile} from '../classes/DataFile';

declare var WaveSurfer: any;

@Component({
  selector: 'app-datafile-card',
  templateUrl: './datafile-card.component.html',
  styleUrls: ['./datafile-card.component.css']
})
export class DatafileCardComponent {

  @Input() file: DataFile;
  @Input() heightFactor: number;

  constructor() { }

  loadPreview() {
    this.file.loadPreview = true;
    if (this.isAudio()) {
      this.loadAudioPreview();
    } else if (this.isImage()) {
      console.log('Hello');
      this.file.previewRenderer = document.querySelector('#image_' + this.file.name.split('.')[0]);
    }
  }

  loadAudioPreview() {
    this.file.previewRenderer = WaveSurfer.create({
      container: '#waveform_' + this.file.name.split('.')[0],
      waveColor: '#404040',
      height: this.heightFactor,
      responsive: true,
      hideScrollBar: true,
      progressColor: 'hsl(210, 79%, 46%)',
      cursorColor: '#707070',
      normalize: true,
      barWidth: 2,
      barMinHeight: 1
    });
    this.file.previewRenderer.load('http://127.0.0.1:5000/static/' + this.file.name);
  }

  playPause() {
    this.file.previewRenderer.playPause();
  }

  selectFile() {
    document.location.href = `/processor?file=${this.file.name}`;
  }

  isAudio() {
    return DataFile.isAudio(this.file);
  }

  isImage() {
    return DataFile.isImage(this.file);
  }

  isMisc() {
    return DataFile.isMisc(this.file);
  }
}
