import { Component, OnInit } from '@angular/core';
import {RestService} from '../api/rest.service';
import {DataPlugin} from '../classes/DataPlugin';
import {DataFile} from '../classes/DataFile';
import {CustomStorage} from '../utils/CustomStorage';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  constructor(private rs: RestService) { }

  inTypes = new Set<string>();
  plugins = new Map<string, DataPlugin[]>();
  params = {};

  getTypeIcon = DataFile.getTypeIcon;

  ngOnInit() {
    this.params = CustomStorage.getPluginParams();
    this.rs.getPlugins().subscribe(
      (plugins) => {
        plugins.forEach(plugin => {
          this.inTypes.add(plugin.inType);
          if (!this.plugins.has(plugin.inType)) {
            this.plugins.set(plugin.inType, []);
          }
          DataPlugin.retrieveParameters(plugin);
          this.plugins.get(plugin.inType).push(plugin);
        });
      },
      (error) => {
        console.log('No Plugins Found' + error);
      }
    );
  }
}
