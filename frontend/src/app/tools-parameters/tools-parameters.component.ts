import {Component, Input, OnInit} from '@angular/core';
import {DataPlugin} from '../classes/DataPlugin';
import {CustomStorage} from '../utils/CustomStorage';

@Component({
  selector: 'app-tools-parameters',
  templateUrl: './tools-parameters.component.html',
  styleUrls: ['./tools-parameters.component.css']
})
export class ToolsParametersComponent {

  @Input() plugin: DataPlugin;
  @Input() params;

  constructor() { }

  setParameter(plugin, param, paramValue) {
    if (param.type === 'int') {
      paramValue = parseInt(paramValue, 10);
    } else if (param.type === 'float') {
      paramValue = parseFloat(paramValue);
    }
    this.params = CustomStorage.setPluginParam(plugin, param.attributeName, paramValue);
  }

  getJsType(type) {
    switch (type) {
      case 'int':
      case 'float':
        return 'number';
      case 'str':
        return 'string';
    }
    return 'string';
  }
}
