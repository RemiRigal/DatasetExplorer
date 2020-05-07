#!/usr/bin/env python
# coding: utf-8

import cv2
import librosa
import collections
from dataset_explorer.io.filetypes import FileType
from dataset_explorer.plugins.parameters import PluginParameter


class BasePlugin(object):

    def __init__(self, name: str, inType: FileType, outType: FileType, icon: str = 'settings', outExtension: str = ''):
        self.name = name
        self.inType = inType
        self.outType = outType
        self.parameters = self._retrieveParameters(self.__class__, list())
        self.icon = icon
        self._outExtension = outExtension.replace(".", "")
        self._loaded = False

    @property
    def outExtension(self):
        if self._outExtension:
            return f".{self._outExtension}"
        return FileType.getDefaultExtension(self.outType)

    def _retrieveParameters(self, cls, parameters):
        if cls == BasePlugin:
            return collections.OrderedDict(parameters)
        parameters = [
            (k, v) for k, v in cls.__dict__.items()
            if not k.startswith('__') and isinstance(v, PluginParameter)
        ] + parameters
        return self._retrieveParameters(cls.__base__, parameters)

    def setParameterValues(self, params):
        for parameter in self.parameters.values():
            parameter.reset()
        for name, value in params.items():
            self.parameters[name].value = value

    def getFileHash(self, dataFile, params):
        parametersCopy = {name: parameter.value for name, parameter in self.parameters.items()}
        parametersCopy.update(params)
        parametersCopy["__datafile"] = dataFile.id
        parametersCopy["__plugin"] = self.name
        return hash(frozenset(parametersCopy.items()))

    def __call__(self, inFilename, outFilename):
        if not self._loaded:
            self.load()
            self._loaded = True
        self.process(inFilename, outFilename)

    def load(self):
        pass

    def process(self, inFilename, outFilename):
        raise NotImplementedError

    def toJson(self):
        return {
            "className": self.__class__.__name__,
            "name": self.name,
            "inType": self.inType.value,
            "outType": self.outType.value,
            "parameters": [parameter.toJson(name) for name, parameter in self.parameters.items()],
            "icon": self.icon
        }


class AudioPlugin(BasePlugin):

    sr = PluginParameter("Sample rate", 0)

    def __init__(self, name: str, outType: FileType, icon: str = 'settings', outExtension: str = ''):
        super(AudioPlugin, self).__init__(name, FileType.AUDIO, outType, icon, outExtension)

    def __call__(self, inFilename, outFilename):
        if not self._loaded:
            self.load()
            self._loaded = True
        loadSr = self.sr.value if self.sr.value else None
        data, self.sr.value = librosa.load(inFilename, sr=loadSr)
        self.process(data, outFilename)

    def process(self, data, outFilename):
        raise NotImplementedError


class ImagePlugin(BasePlugin):

    def __init__(self, name: str, outType: FileType, icon: str = 'settings', outExtension: str = ''):
        super(ImagePlugin, self).__init__(name, FileType.IMAGE, outType, icon, outExtension)

    def __call__(self, inFilename, outFilename):
        if not self._loaded:
            self.load()
            self._loaded = True
        data = cv2.imread(inFilename)
        self.process(data, outFilename)

    def process(self, data, outFilename):
        raise NotImplementedError
