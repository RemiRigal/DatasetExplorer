import {CustomStorage} from '../utils/CustomStorage';

export class DataPlugin {

  className: string;
  name: string;
  inType: string[];
  outType: string[];
  icon: string;
  parameters: DataPluginParameter[];

  constructor(className, name, inType, outType, icon, parameters) {
    this.className = className;
    this.name = name;
    this.inType = inType;
    this.outType = outType;
    this.icon = icon;
    this.parameters = parameters;
  }

  public static setParametersFromLocalStorage(plugin) {
    const userParams = CustomStorage.getPluginParams(plugin.className);
    plugin.parameters.forEach(parameter => {
      if (parameter.attributeName in userParams) {
        parameter.value = userParams[parameter.attributeName];
      }
    });
  }

  public static getParametersObject(plugin) {
    const params = {};
    plugin.parameters.forEach(parameter => {
      params[parameter.attributeName] = parameter.value;
    });
    return params;
  }
}

export class DataPluginParameter {

  attributeName: string;
  name: string;
  value: any;
  defaultValue: any;
  type: string;

  constructor(attributeName, name, value, defaultValue, type) {
    this.attributeName = attributeName;
    this.name = name;
    this.value = value;
    this.defaultValue = defaultValue;
    this.type = type;
  }
}
