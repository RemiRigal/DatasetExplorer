import {Component} from 'rete';
import {SocketFactory} from '../sockets';
import {DataPlugin} from '../../../../scripts/classes/DataPlugin';

export class DataPluginComponent extends Component {

  plugin: DataPlugin;

  constructor(plugin: DataPlugin) {
    super(plugin.name);
    this.plugin = plugin;
  }

  builder(node) {
    if (Object.keys(node.data).length === 0) {
      const pluginCopy = JSON.parse(JSON.stringify(this.plugin));
      node.data = {
        plugin: pluginCopy,
        pluginName: pluginCopy.className,
        params: DataPlugin.getParametersObject(pluginCopy)
      };
    }
    this.plugin.inType.forEach((inType, index) => {
      node.addInput(SocketFactory.inputFromType(`${inType}-${index}`, inType));
    });
    this.plugin.outType.forEach((outType, index) => {
      node.addOutput(SocketFactory.outputFromType(`${outType}-${index}`, outType));
    });
    return node;
  }

  worker(node, inputs, outputs) { }
}
