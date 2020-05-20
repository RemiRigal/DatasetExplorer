#!/usr/bin/env python
# coding: utf-8

import os
import tempfile
from . import Pipeline
from dataset_explorer.utils import Singleton


class PipelineManager(object, metaclass=Singleton):

    pipelineDirectory = os.path.expanduser("~/.DatasetExplorer/pipelines")

    def __init__(self):
        self.pipelines = dict()
        self.pipelineFiles = dict()
        self._loadPipelines()

    def _loadPipelines(self):
        if not os.path.exists(self.pipelineDirectory):
            os.makedirs(self.pipelineDirectory)
        for filename in os.listdir(self.pipelineDirectory):
            pipeline = Pipeline.fromFile(os.path.join(self.pipelineDirectory, filename))
            self.pipelines[pipeline.name] = pipeline
            self.pipelineFiles[pipeline.name] = filename

    def getPipeline(self, name: str) -> Pipeline:
        return self.pipelines[name]

    def getAllPipelines(self) -> list:
        return list(self.pipelines.values())

    def deletePipeline(self, name: str):
        path = os.path.join(self.pipelineDirectory, self.pipelineFiles[name])
        if os.path.exists(path):
            os.remove(path)
        self.pipelines.pop(name)
        self.pipelineFiles.pop(name)

    def createPipeline(self, name: str, diagram: dict):
        pipeline = Pipeline(name, diagram)
        path = tempfile.NamedTemporaryFile(suffix=".ppln", dir=self.pipelineDirectory).name
        pipeline.toFile(path)
        self.pipelines[name] = pipeline
        self.pipelineFiles[name] = os.path.basename(path)
        return pipeline
