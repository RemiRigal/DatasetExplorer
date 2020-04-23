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
from dataset_explorer.plugins.exceptions import ProcessError, OutputFileNotFound, InstantiationError


class PluginManager(object):

    pluginDirectory = os.path.expanduser("~/.DatasetExplorer/plugins")
    baseClasses = [BasePlugin, AudioPlugin, ImagePlugin]

    def __init__(self):
        sys.path.append(self.pluginDirectory)
        self.plugins = self._discoverPlugins()
        self.staticDirectory = tempfile.mkdtemp()

    def applyPlugin(self, className, filename, **kwargs):
        plugin = self.plugins[className]
        fileDirectory = os.path.join(self.staticDirectory, os.path.basename(filename))
        if not os.path.exists(fileDirectory):
            os.makedirs(fileDirectory)
        processedFileName = self.getPluginFile(className, filename)
        if not os.path.exists(processedFileName):
            try:
                plugin(filename, processedFileName, **kwargs)
            except Exception as e:
                raise ProcessError("Error in plugin {} during processing".format(className), e)
            if not os.path.exists(processedFileName):
                raise OutputFileNotFound("No output file for plugin {}".format(className))
        return {
            "id": className,
            "name": plugin.name,
            "size": os.path.getsize(processedFileName),
            "ext": plugin.outExtension,
            "type": plugin.outType.value,
            "url": "/plugins/static/{}/{}".format(className, os.path.basename(filename))
        }

    def getPluginFile(self, className, filename):
        plugin = self.plugins[className]
        fileDirectory = os.path.join(self.staticDirectory, os.path.basename(filename))
        processedFileExtension = ".{}".format(plugin.outExtension) if plugin.outExtension else ""
        return os.path.join(fileDirectory, "{}{}".format(className, processedFileExtension))

    def getAvailablePlugins(self):
        return [plugin.toJson() for name, plugin in self.plugins.items()]

    def getAvailablePluginsByInType(self, inType: FileType):
        return [plugin.toJson() for name, plugin in self.plugins.items() if plugin.inType == inType]

    def _discoverPlugins(self):
        plugins = dict()
        localPath = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        extraPaths = [path for path in os.getenv("DATASET_EXPLORER_PLUGINS", "").split(":") if path]
        for path in extraPaths:
            sys.path.append(path)
        for fileFinder, name, isPkg in walk_packages([localPath, self.pluginDirectory] + extraPaths):
            if isPkg:
                continue
            module = importlib.import_module(name)
            moduleContent = dir(module)
            for content in moduleContent:
                cls = getattr(sys.modules[name], content)
                if inspect.isclass(cls) and cls not in self.baseClasses and issubclass(cls, BasePlugin):
                    try:
                        pluginInstance = cls()
                        plugins[cls.__name__] = pluginInstance
                    except TypeError as e:
                        raise InstantiationError("Unable to instantiate plugin {}, makes sure that it doesn't have constructor arguments".format(cls.__name__), e)
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
