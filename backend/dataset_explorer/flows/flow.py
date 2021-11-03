#!/usr/bin/env python
# coding: utf-8

import os
import json
from typing import Union, Iterable

from .exceptions import LoadError
from ..io import DataFile
from ..plugins import PluginManager


class FlowDiagram(object):

    def __init__(self, jsonDiagram: dict):
        self.json = jsonDiagram
        self.nodes = dict()
        self.inputNodes = list()
        self.outputNodes = list()
        for nodeId, jsonNode in jsonDiagram["nodes"].items():
            nodeId = int(nodeId)
            self.nodes[nodeId] = jsonNode
            if len(jsonNode["inputs"]) == 0 and len(jsonNode["outputs"]) > 0:
                self.inputNodes.append(nodeId)
            if len(jsonNode["outputs"]) == 0 and len(jsonNode["inputs"]) > 0:
                self.outputNodes.append(nodeId)
        self.pluginManager = PluginManager()
        self.cache = dict()

    def apply(self, data):
        self.cache.clear()
        outputs = list()
        for node in self.outputNodes:
            outputs.append(self.flowStep(data, node))
        return outputs[0] if len(outputs) == 1 else outputs

    def flowStep(self, data, nodeId):
        print(f"======> {data.shape} | {nodeId}")
        node = self.nodes[nodeId]
        if nodeId in self.inputNodes:
            if len(self.inputNodes) == 1:
                return data
            index = self.inputNodes.index(nodeId)
            return data[index]
        previousNodes = list()
        for inputKey in node["inputs"].keys():
            previousNodes.append(node["inputs"][inputKey]["connections"][0]["node"])
        if nodeId in self.outputNodes:
            return self.flowStep(data, previousNodes[0])
        pluginName = node["data"]["pluginName"]
        params = node["data"]["params"]
        if len(previousNodes) == 1:
            return self.pluginManager.processData(pluginName, self.flowStep(data, previousNodes[0]), params)
        return self.pluginManager.processData(pluginName, [self.flowStep(data, nodeId) for nodeId in previousNodes], params)

    def getAllInputs(self):
        return [node for node in self.nodes.values() if node.isInput()]


class Flow(object):

    def __init__(self, name: str, diagram: dict):
        self.name = name
        self.diagram = FlowDiagram(diagram)

    def process(self, dataFile: Union[DataFile, Iterable[DataFile]]):
        pass

    @staticmethod
    def fromFile(path: str):
        try:
            with open(path, "r") as stream:
                flowJSON = json.load(stream)
            return Flow(flowJSON["name"], flowJSON["diagram"])
        except Exception as e:
            raise LoadError(f"Error when trying to load flow from file {path}", e)

    def toFile(self, path: str):
        with open(path, "w") as stream:
            json.dump(self.toJSON(), stream)

    def toJSON(self):
        return {
            "name": self.name,
            "diagram": self.diagram.json
        }
