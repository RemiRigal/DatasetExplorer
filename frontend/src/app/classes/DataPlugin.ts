export class DataPlugin {

  name: string;
  inType: string;
  outType: string;
  icon: string;

  constructor(name, inType, outType, icon) {
    this.name = name;
    this.inType = inType;
    this.outType = outType;
    this.icon = icon;
  }

}
