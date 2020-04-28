#!/usr/bin/env python
# coding: utf-8


class PluginParameter(object):

    def __init__(self, name, value):
        self.name = name
        self.value = value
        self._defaultValue = value

    def reset(self):
        self.value = self._defaultValue

    def toJson(self, attributeName=""):
        return {
            "attributeName": attributeName,
            "name": self.name,
            "value": self._defaultValue,
            "default": self._defaultValue,
            "type": type(self.value).__name__
        }


if __name__ == "__main__":
    pass
