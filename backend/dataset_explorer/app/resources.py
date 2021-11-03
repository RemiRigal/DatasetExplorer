#!/usr/bin/env python
# coding: utf-8

from flask import request
from flask_restful import Resource
from dataset_explorer.flows import FlowManager


flowManager = FlowManager()


class FlowResource(Resource):

    def get(self, name: str = None):
        if name is None:
            return [flow.toJSON() for flow in flowManager.getAllFlows()]
        return flowManager.getFlow(name).toJSON()

    def put(self, name: str):
        flow = flowManager.createFlow(name, request.json)
        return flow.toJSON(), 201

    def delete(self, name: str):
        flowManager.deleteFlow(name)
        return '', 204


class TaskResource(Resource):

    def get(self, taskId: int = None):
        return ''

    def put(self, data):
        return '', 201

    def delete(self, taskId: int = None):
        return '', 204

