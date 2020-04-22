export class DataPlugin {

  className: string;
  name: string;
  inType: string;
  outType: string;
  icon: string;

  constructor(className, name, inType, outType, icon) {
    this.className = className;
    this.name = name;
    this.inType = inType;
    this.outType = outType;
    this.icon = icon;
  }

}
