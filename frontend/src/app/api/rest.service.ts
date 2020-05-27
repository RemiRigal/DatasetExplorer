import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataFile} from '../scripts/classes/DataFile';
import {DataPlugin} from '../scripts/classes/DataPlugin';
import {environment} from '../../environments/environment';
import {Flow} from '../scripts/classes/Flow';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  dataFilesUrl = 'datafiles';
  pluginsUrl = 'plugins';
  flowsUrl = 'flows';

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

  getFlows() {
    return this.http.get<Flow[]>(this.flowsUrl);
  }

  getFlow(name: string) {
    return this.http.get<Flow>(`${this.flowsUrl}/${name}`);
  }

  deleteFlow(name: string) {
    return this.http.delete<Flow>(`${this.flowsUrl}/${name}`);
  }

  createFlow(name: string, diagram: object) {
    return this.http.put(`${this.flowsUrl}/${name}`, diagram);
  }
}
