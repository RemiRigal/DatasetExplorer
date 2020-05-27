import {NodeEditor as ReteNodeEditor} from 'rete';


declare module 'rete/types/events' {
    interface EventsTypes {
        nodeeditclick: Node;
        nodedeleteclick: Node;
        arrangeall: Node;
        arrange: Node;
    }
}

export class NodeEditor extends ReteNodeEditor {

  constructor(id: string, container: HTMLElement) {
    super(id, container);
    this.bind('nodeeditclick');
    this.bind('nodedeleteclick');
  }

  getNbFlows() {
    const inBoard = new Set();
    let nbFlows = 0;
    this.nodes.forEach((node) => {
      if (!inBoard.has(node)) {
        const board = this.getNodesBoard(node);
        board.getValues().forEach((boardNode) => {
          inBoard.add(boardNode);
        });
        nbFlows++;
      }
    });
    return nbFlows;
  }

  getNbOutputs() {
    let nbOutputs = 0;
    this.nodes.forEach((node) => {
      if (node.outputs.size === 0 && node.inputs.size > 0) {
        nbOutputs++;
      }
    });
    return nbOutputs;
  }

  getNbInputs() {
    let nbInputs = 0;
    this.nodes.forEach((node) => {
      if (node.inputs.size === 0 && node.outputs.size > 0) {
        nbInputs++;
      }
    });
    return nbInputs;
  }

  private getNodesBoard(node, cache = new NodeEditorCache(), board = new NodeEditorBoard(), depth = 0) {
    if (cache.track(node)) {
      return;
    }
    board.add(depth, node);
    this.getConnectedNodes(node, 'output').map(n => this.getNodesBoard(n, cache, board, depth + 1));
    this.getConnectedNodes(node, 'input').map(n => this.getNodesBoard(n, cache, board, depth - 1));
    return board;
  }

  private getConnectedNodes(node, type = 'output') {
    const nodes = [];
    const key = `${type}s`;
    for (const io of node[key].values()) {
      for (const connection of io.connections.values()) {
        nodes.push(connection[type === 'input' ? 'output' : 'input'].node);
      }
    }
    return nodes;
  }
}

export class NodeEditorCache {

    map = new WeakMap();

    track(value) {
      if (this.map.has(value)) {
        return true;
      }
      this.map.set(value, true);
    }
}

export class NodeEditorBoard {

  cols = [];

  add(columnIndex, value) {
    if (!this.cols[columnIndex]) {
      this.cols[columnIndex] = [];
    }
    this.cols[columnIndex].push(value);
  }

  getValues() {
    const values = [];
    this.cols.forEach((col) => {
      col.forEach((value) => {
        values.push(value);
      });
    });
    return values;
  }
}
