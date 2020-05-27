import {Component, Input, OnInit} from '@angular/core';
import {DataPlugin} from '../../scripts/classes/DataPlugin';
import {CustomStorage} from '../../scripts/utils/CustomStorage';

export enum LocalStorageProfile {
  None,
  Load,
  Save,
  LoadAndSave
}

@Component({
  selector: 'app-tools-parameters',
  templateUrl: './tools-parameters.component.html',
  styleUrls: ['./tools-parameters.component.css']
})
export class ToolsParametersComponent implements OnInit {

  @Input() plugin: DataPlugin;
  @Input() localStorageProfile: LocalStorageProfile = LocalStorageProfile.None;

  ngOnInit() {
    if (this.localStorageProfile === LocalStorageProfile.Load || this.localStorageProfile === LocalStorageProfile.LoadAndSave) {
      DataPlugin.setParametersFromLocalStorage(this.plugin);
    }
  }

  setParameter(plugin, param, paramValue) {
    if (param.type === 'int') {
      paramValue = parseInt(paramValue, 10);
    } else if (param.type === 'float') {
      paramValue = parseFloat(paramValue);
    }
    if (this.localStorageProfile === LocalStorageProfile.Save || this.localStorageProfile === LocalStorageProfile.LoadAndSave) {
      CustomStorage.setPluginParam(plugin, param.attributeName, paramValue);
    }
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
