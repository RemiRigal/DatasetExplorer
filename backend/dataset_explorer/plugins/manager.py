#!/usr/bin/env python
# coding: utf-8

import os
import sys
import inspect
import tempfile
import importlib
import importlib.util
from pkgutil import walk_packages
from dataset_explorer.io import DataFile, FileType
from dataset_explorer.utils import getPluginsPath, Singleton
from . import BasePlugin
from .exceptions import ProcessError, OutputFileNotFound, InstantiationError


class PluginManager(object, metaclass=Singleton):

    userPluginDirectory = os.path.expanduser("~/.DatasetExplorer/plugins")
    localPluginDirectory = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "plugins")
    baseClasses = [BasePlugin]

    def __init__(self):
        sys.path.append(self.userPluginDirectory)
        sys.path.append(self.localPluginDirectory)
        self.plugins = self._discoverPlugins()
        self.staticDirectory = tempfile.mkdtemp()
        self.processedFiles = dict()

    def processData(self, pluginName, dataIn, params):
        plugin = self.plugins[pluginName]
        plugin.setParameterValues(params)
        return plugin.process(dataIn)

    def processFile(self, pluginName, dataFile, params):
        plugin = self.plugins[pluginName]
        fileHash = plugin.getFileHash(dataFile, params)
        if fileHash in self.processedFiles.keys():
            return self.processedFiles.get(fileHash)
        outFilename = self.getTempFile(plugin)
        plugin.setParameterValues(params)
        try:
            plugin(dataFile.path, outFilename)
        except Exception as e:
            raise ProcessError("Error in plugin {} during processing".format(pluginName), e)
        if not os.path.exists(outFilename):
            raise OutputFileNotFound("Output file not written by plugin {}".format(pluginName))
        dataFile = DataFile.fromPath(outFilename, name=plugin.name, urlPrefix="/plugins/static")
        self.processedFiles[fileHash] = dataFile
        return dataFile

    def getTempFile(self, plugin):
        tempFile = tempfile.NamedTemporaryFile(suffix=plugin.outExtension, dir=self.staticDirectory)
        return tempFile.name

    def getAvailablePlugins(self):
        return [plugin.toJson() for name, plugin in self.plugins.items()]

    def getAvailablePluginsByInType(self, inType: FileType):
        return [plugin.toJson() for name, plugin in self.plugins.items() if plugin.inType == inType]

    def _discoverPlugins(self):
        plugins = dict()
        extraPaths = getPluginsPath()
        for path in extraPaths:
            sys.path.append(path)
        for fileFinder, name, isPkg in walk_packages([self.localPluginDirectory, self.userPluginDirectory] + extraPaths):
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
