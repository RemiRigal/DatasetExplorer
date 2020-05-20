import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataFile} from '../classes/DataFile';
import {DataPlugin} from '../classes/DataPlugin';
import {environment} from '../../environments/environment';
import {Pipeline} from '../classes/Pipeline';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  dataFilesUrl = 'datafiles';
  pluginsUrl = 'plugins';
  pipelinesUrl = 'pipelines';

  public static getStaticFileUrl(url) {
    return `${environment.apiUrl}${url}`;
  }

  getDataFiles() {
    return this.http.get<DataFile[]>(this.dataFilesUrl);
  }

  getDataFile(filename) {
    return this.http.get<DataFile>(`${this.dataFilesUrl}/${filename}`);
  }

  getPlugins() {
    return this.http.get<DataPlugin[]>(this.pluginsUrl);
  }

  applyPlugin(pluginName, filename, params) {
    return this.http.post<DataFile>(`${this.pluginsUrl}/${pluginName}/${filename}`, params);
  }

  getPipelines() {
    return this.http.get<Pipeline[]>(this.pipelinesUrl);
  }

  getPipeline(name: string) {
    return this.http.get<Pipeline>(`${this.pipelinesUrl}/${name}`);
  }

  deletePipeline(name: string) {
    return this.http.delete<Pipeline>(`${this.pipelinesUrl}/${name}`);
  }

  createPipeline(name: string, diagram: object) {
    return this.http.put(`${this.pipelinesUrl}/${name}`, diagram);
  }
}
