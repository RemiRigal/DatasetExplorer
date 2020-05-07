#!/usr/bin/env python
# coding: utf-8

from typing import Union


class PluginParameter(object):
    """
    User-editable parameter for plugins.
    """

    def __init__(self, name: str, value: Union[int, float, str, bool]):
        """
        Create a PluginParameter instance.

        Args:
            name: The name of the parameter, it will be displayed within the web interface
            value: The default value of the parameter
        """
        self.name = name
        self.value = value
        self._defaultValue = value

    def reset(self):
        """
        Sets back the value of the parameter to its default value.
        """
        self.value = self._defaultValue

    def toJson(self, attributeName: str) -> dict:
        """
        Generates and returns the JSON representation of the parameter.

        Args:
            attributeName: The name of the Python instance

        Returns:
            The JSON representation of the parameter as a dict
        """
        return {
            "attributeName": attributeName,
            "name": self.name,
            "value": self._defaultValue,
            "default": self._defaultValue,
            "type": type(self.value).__name__
        }
