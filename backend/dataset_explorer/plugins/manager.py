#!/usr/bin/env python
# coding: utf-8

import os
import sys
import inspect
import tempfile
import importlib
import importlib.util
from pkgutil import walk_packages
from dataset_explorer.filetypes import FileType
from dataset_explorer.plugins.base import BasePlugin, AudioPlugin, ImagePlugin


class PluginManager(object):

    pluginDirectory = os.path.expanduser("~/.DatasetExplorer/plugins")
    baseClasses = [BasePlugin, AudioPlugin, ImagePlugin]

    def __init__(self):
        sys.path.append(self.pluginDirectory)
        self.plugins = self._discoverPlugins()
        self.staticDirectory = tempfile.mkdtemp()

    def applyPlugin(self, name, filename, **kwargs):
        fileDirectory = os.path.join(self.staticDirectory, os.path.basename(filename))
        if not os.path.exists(fileDirectory):
            os.makedirs(fileDirectory)
        processedFileName = os.path.join(fileDirectory, "{}.{}".format(name, self.plugins[name].outExtension))
        if os.path.exists(processedFileName):
            return processedFileName
        return self.plugins[name](filename, processedFileName, **kwargs)

    def getAvailablePlugins(self):
        return [{
            "name": plugin.name,
            "inType": plugin.inType.value,
            "outType": plugin.outType.value,
            "icon": plugin.icon
        } for name, plugin in self.plugins.items()]

    def getAvailablePluginsByInType(self, inType: FileType):
        return [{
            "name": plugin.name,
            "inType": plugin.inType.value,
            "outType": plugin.outType.value,
            "icon": plugin.icon
        } for name, plugin in self.plugins.items() if plugin.inType == inType]

    def _discoverPlugins(self):
        plugins = dict()
        localPath = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        for fileFinder, name, isPkg in walk_packages([localPath, self.pluginDirectory]):
            if isPkg:
                continue
            module = importlib.import_module(name)
            moduleContent = dir(module)
            for content in moduleContent:
                cls = getattr(sys.modules[name], content)
                if inspect.isclass(cls) and cls not in self.baseClasses and issubclass(cls, BasePlugin):
                    pluginInstance = cls()
                    plugins[pluginInstance.name] = pluginInstance
        return plugins


if __name__ == "__main__":
    pluginManager = PluginManager()

    print("All plugins:")
    print(pluginManager.getAvailablePlugins())
    print("")
    print("All plugins for audio files:")
    print(pluginManager.getAvailablePluginsByInType(FileType.AUDIO))
    print("")
    print("All plugins for image files:")
    print(pluginManager.getAvailablePluginsByInType(FileType.IMAGE))
