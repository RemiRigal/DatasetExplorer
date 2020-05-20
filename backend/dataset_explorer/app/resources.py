#!/usr/bin/env python
# coding: utf-8

from flask import request
from flask_restful import Resource
from dataset_explorer.pipelines import PipelineManager


pipelineManager = PipelineManager()


class PipelineResource(Resource):

    def get(self, name: str = None):
        if name is None:
            return [pipeline.toJSON() for pipeline in pipelineManager.getAllPipelines()]
        return pipelineManager.getPipeline(name).toJSON()

    def put(self, name: str):
        pipeline = pipelineManager.createPipeline(name, request.json)
        return pipeline.toJSON(), 201

    def delete(self, name: str):
        pipelineManager.deletePipeline(name)
        return '', 204
