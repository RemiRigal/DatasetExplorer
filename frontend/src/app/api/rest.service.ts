import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataFile} from '../classes/DataFile';
import {AudioFile} from '../classes/AudioFile';
import {DataPlugin} from '../classes/DataPlugin';
import {environment} from '../../environments/environment';
import {CustomStorage} from '../utils/CustomStorage';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  dataFilesUrl = 'datafiles';
  loadAudioFileUrl = 'datafile/audio/';
  pluginsUrl = 'plugins';

  public static getStaticFileUrl(url) {
    return `${environment.apiUrl}${url}`;
  }

  getDataFiles() {
    return this.http.get<DataFile[]>(this.dataFilesUrl);
  }

  getDataFile(filename) {
    return this.http.get<DataFile[]>(`${this.dataFilesUrl}/${filename}`);
  }

  getPlugins() {
    return this.http.get<DataPlugin[]>(this.pluginsUrl);
  }

  applyPlugin(pluginName, filename, params) {
    return this.http.post<DataFile>(`${this.pluginsUrl}/${pluginName}/${filename}`, params);
  }

  loadAudioFile(filename, sr: number = null) {
    let fullUrl = this.loadAudioFileUrl + filename;
    if (sr !== null) {
      fullUrl += '?sr=' + sr;
    }
    return this.http.get<AudioFile>(fullUrl);
  }

}
