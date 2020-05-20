import {Component} from 'rete';
import {SocketFactory} from '../sockets';

export class FileComponent extends Component {

  type: string;
  isInput: boolean;

  constructor(name: string, type: string, isInput: boolean) {
    super(name);
    this.type = type;
    this.isInput = isInput;
  }

  builder(node) {
    if (this.isInput) {
      node.addOutput(SocketFactory.outputFromType(this.type, this.type));
    } else {
      node.addInput(SocketFactory.inputFromType(this.type, this.type));
    }
    return node;
  }

  worker(node, inputs, outputs) { }

}
