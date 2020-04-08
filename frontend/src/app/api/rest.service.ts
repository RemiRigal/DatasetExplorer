import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataFile} from '../classes/DataFile';
import {AudioFile} from '../classes/AudioFile';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  dataFilesUrl = 'datafiles';
  loadAudioFileUrl = 'datafile/audio/';

  getDataFiles() {
    return this.http.get<DataFile[]>(this.dataFilesUrl);
  }

  getDataFile(filename) {
    return this.http.get<DataFile[]>(`${this.dataFilesUrl}/${filename}`);
  }

  loadAudioFile(filename, sr: number = null) {
    let fullUrl = this.loadAudioFileUrl + filename;
    if (sr !== null) {
      fullUrl += '?sr=' + sr;
    }
    return this.http.get<AudioFile>(fullUrl);
  }

}
