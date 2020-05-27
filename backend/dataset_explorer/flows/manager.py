#!/usr/bin/env python
# coding: utf-8

import os
import tempfile
from . import Flow
from dataset_explorer.utils import Singleton


class FlowManager(object, metaclass=Singleton):

    flowDirectory = os.path.expanduser("~/.DatasetExplorer/flows")

    def __init__(self):
        self.flows = dict()
        self.flowFiles = dict()
        self._loadFlows()

    def _loadFlows(self):
        if not os.path.exists(self.flowDirectory):
            os.makedirs(self.flowDirectory)
        for filename in os.listdir(self.flowDirectory):
            flow = Flow.fromFile(os.path.join(self.flowDirectory, filename))
            self.flows[flow.name] = flow
            self.flowFiles[flow.name] = filename

    def getFlow(self, name: str) -> Flow:
        return self.flows[name]

    def getAllFlows(self) -> list:
        return list(self.flows.values())

    def deleteFlow(self, name: str):
        path = os.path.join(self.flowDirectory, self.flowFiles[name])
        if os.path.exists(path):
            os.remove(path)
        self.flows.pop(name)
        self.flowFiles.pop(name)

    def createFlow(self, name: str, diagram: dict):
        flow = Flow(name, diagram)
        path = tempfile.NamedTemporaryFile(suffix=".ppln", dir=self.flowDirectory).name
        flow.toFile(path)
        self.flows[name] = flow
        self.flowFiles[name] = os.path.basename(path)
        return flow
