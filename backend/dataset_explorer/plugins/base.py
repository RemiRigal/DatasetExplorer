#!/usr/bin/env python
# coding: utf-8

import cv2
import librosa
from dataset_explorer.filetypes import FileType


class BasePlugin(object):

    def __init__(self, name: str, inType: FileType, outType: FileType, icon: str = 'settings', outExtension: str = ''):
        self.name = name
        self.inType = inType
        self.outType = outType
        self.icon = icon
        self.outExtension = outExtension
        self._loaded = False

    def __call__(self, inFilename, outFilename, **kwargs):
        if not self._loaded:
            self.load()
            self._loaded = True
        return self.process(inFilename, outFilename, **kwargs)

    def load(self):
        pass

    def process(self, inFilename, outFilename, **kwargs):
        raise NotImplementedError

    def toJson(self):
        return {
            "className": self.__class__.__name__,
            "name": self.name,
            "inType": self.inType.value,
            "outType": self.outType.value,
            "icon": self.icon
        }


class AudioPlugin(BasePlugin):

    def __init__(self, name: str, outType: FileType, icon: str = 'settings', outExtension: str = ''):
        super(AudioPlugin, self).__init__(name, FileType.AUDIO, outType, icon, outExtension)

    def __call__(self, inFilename, outFilename, **kwargs):
        if not self._loaded:
            self.load()
            self._loaded = True
        data, sr = librosa.load(inFilename, sr=kwargs.get("sr", None))
        kwargs["sr"] = sr
        return self.process(data, outFilename, **kwargs)

    def process(self, data, outFilename, **kwargs):
        raise NotImplementedError


class ImagePlugin(BasePlugin):

    def __init__(self, name: str, outType: FileType, icon: str = 'settings', outExtension: str = ''):
        super(ImagePlugin, self).__init__(name, FileType.IMAGE, outType, icon, outExtension)

    def __call__(self, inFilename, outFilename, **kwargs):
        if not self._loaded:
            self.load()
            self._loaded = True
        data = cv2.imread(inFilename)
        return self.process(data, outFilename, **kwargs)

    def process(self, data, outFilename, **kwargs):
        raise NotImplementedError
