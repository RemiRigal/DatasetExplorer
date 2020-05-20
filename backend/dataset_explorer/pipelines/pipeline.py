#!/usr/bin/env python
# coding: utf-8

import os
import json
from .exceptions import LoadError


class Pipeline(object):

    def __init__(self, name: str, diagram: dict):
        self.name = name
        self.diagram = diagram

    @staticmethod
    def fromFile(path):
        try:
            with open(path, "r") as stream:
                pipelineJSON = json.load(stream)
            return Pipeline(pipelineJSON["name"], pipelineJSON["diagram"])
        except Exception as e:
            raise LoadError(f"Error when trying to load pipeline from file {path}", e)

    def toFile(self, path: str):
        with open(path, "w") as stream:
            json.dump(self.toJSON(), stream)

    def toJSON(self):
        return {
            "name": self.name,
            "diagram": self.diagram
        }
