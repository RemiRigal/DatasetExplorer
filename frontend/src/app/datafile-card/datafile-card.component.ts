import {Component, Inject, Input, OnInit} from '@angular/core';
import {DataFile} from '../classes/DataFile';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RestService} from '../api/rest.service';

declare var WaveSurfer: any;

@Component({
  selector: 'app-datafile-card',
  templateUrl: './datafile-card.component.html',
  styleUrls: ['./datafile-card.component.css']
})
export class DatafileCardComponent {

  @Input() file: DataFile;
  @Input() cardHeight: number;
  @Input() waveSurferBarWidth = 2;
  @Input() selectable = false;

  constructor(public dialog: MatDialog) { }

  loadPreview(visible: boolean) {
    if (this.file.url === '') {

    } else if (!visible) {
      this.file.loadPreview = false;
      if (this.isAudio()) {
        this.file.previewRenderer.destroy();
      }
      this.file.previewRenderer = undefined;
    } else {
      this.file.loadPreview = true;
      if (this.isAudio()) {
        this.loadAudioPreview();
      } else if (this.isImage()) {
        this.file.previewRenderer = document.querySelector('#image_' + this.file.id);
      }
    }
  }

  getImageUrl() {
    return RestService.getStaticFileUrl(this.file.url);
  }

  loadAudioPreview() {
    this.file.previewRenderer = WaveSurfer.create({
      container: '#waveform_' + this.file.id,
      waveColor: '#404040',
      height: this.cardHeight,
      responsive: true,
      hideScrollBar: true,
      progressColor: 'hsl(210, 79%, 46%)',
      cursorColor: '#707070',
      normalize: true,
      barWidth: this.waveSurferBarWidth,
      barMinHeight: 1
    });
    this.file.previewRenderer.load(RestService.getStaticFileUrl(this.file.url));
  }

  openImageDialog() {
    this.dialog.open(DatafilePreviewImageDialogComponent, {
      maxHeight: '90vh',
      data: RestService.getStaticFileUrl(this.file.url)
    });
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

@Component({
  selector: 'app-datafile-preview-image-dialog',
  templateUrl: 'app-datafile-preview-image-dialog.html',
})
export class DatafilePreviewImageDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DatafilePreviewImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public staticUrl: string
  ) {}

  onClick(): void {
    this.dialogRef.close();
  }

}
