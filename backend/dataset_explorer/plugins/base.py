#!/usr/bin/env python
# coding: utf-8

import cv2
import librosa
import numpy as np
from . import PluginParameter
from .exceptions import PluginError
from collections import OrderedDict
from typing import Optional, Union, Iterable
from dataset_explorer.io import DataFile, FileType, FileReader, FileWriter


class BasePlugin(object):
    """
    Base class for plugins.
    """

    def __init__(self, name: str,
                 inType: Union[FileType, Iterable[FileType]],
                 outType: Union[FileType, Iterable[FileType]],
                 icon: Optional[str] = 'settings',
                 outExtension: Optional[Union[str, Iterable[str]]] = None):
        """
        Creates a BasePlugin instance.

        Args:
            name: The name is the plugin as it will be displayed within the web interface
            inType: The input type(s) of the plugin
            outType: The output type(s) of the plugin
            icon: The name of the icon, must be one of the Angular Material Icon list
            outExtension: If specified, overrides the default file extension(s) for the provided output file(s)

        Note:
            Default file extensions for each type are:

            - Image: .png
            - Audio: .wav
            - Video: .mp4
            - Text: .txt
            - Misc: _no extension_
        """
        self.name = name
        self.inType = [inType] if isinstance(inType, FileType) else inType
        self.outType = [outType] if isinstance(outType, FileType) else outType
        self.parameters = self._retrieveParameters(self.__class__, list())
        self.icon = icon
        if isinstance(outExtension, str):
            outExtension = [outExtension]
        if outExtension is not None:
            self.outExtension = [f".{ext.replace('.', '')}" for ext in outExtension]
        else:
            self.outExtension = [FileType.getDefaultExtension(out) for out in self.outType]
        if len(self.outType) != len(self.outExtension):
            raise PluginError("Size mismatch: outType and outExtension iterables must have the same size")
        self.nbOutputFiles = len(self.outType)
        self._loaded = False
        self._fileReader = FileReader()
        self._fileWriter = FileWriter()

    def _retrieveParameters(self, cls: type, parameters: list) -> OrderedDict:
        """
        Recursive function that walks through the inheritance graph of a class to retrieve all PluginParameter instances
        defined as class attributes.

        Args:
            cls: The class to inspect
            parameters: The list accumulator

        Returns:
            An OrderedDict instance containing all the retrieved PluginParameter instances
        """
        if cls == BasePlugin:
            return OrderedDict(parameters)
        parameters = [
            (k, v) for k, v in cls.__dict__.items()
            if not k.startswith('__') and isinstance(v, PluginParameter)
        ] + parameters
        return self._retrieveParameters(cls.__base__, parameters)

    def setParameterValues(self, params: dict):
        """
        Overrides the values of all the parameters of the plugin to match the user-specified params dict.
        If not specified, they are set to their default value.

        Args:
            params: The user-specified params dict.
                The syntax of the latter is:
                ```python
                {
                    "paramName1": value,
                    "paramName2": value
                }
                ```
        """
        for parameter in self.parameters.values():
            parameter.reset()
        for name, value in params.items():
            self.parameters[name].value = value

    def getFileHash(self, dataFile: DataFile, params: dict) -> int:
        """
        Computes and returns a unique hash for the three elements:

        - Plugin
        - Input data file
        - Parameters

        Allows for caching already processed files.

        Args:
            dataFile: The DataFile instance of the file to process
            params: The user-specified parameters

        Returns:
            A unique hash for the combination (Plugin + File + Params)
        """
        parametersCopy = {name: parameter.value for name, parameter in self.parameters.items()}
        parametersCopy.update(params)
        parametersCopy["__datafile"] = dataFile.id
        parametersCopy["__plugin"] = self.name
        return hash(frozenset(parametersCopy.items()))

    def __call__(self, inFilename: Union[DataFile, Iterable[DataFile]], outFilename: Union[DataFile, Iterable[DataFile]]):
        """
        Internal call of the plugin, loads the plugin if necessary and calls the `process` method.

        Args:
            inFilename: The path of the file to be processed
            outFilename: The path to which the processed file must be written
        """
        if not self._loaded:
            self.load()
            self._loaded = True
        inData = self._fileReader.read(inFilename)
        outData = self.process(inData)
        self._fileWriter.write(outFilename, outData)

    def setFileReader(self, fileReader: FileReader):
        if not isinstance(fileReader, FileReader):
            raise PluginError("Bad FileReader: must be an instance of the FileReader class or any of its child class")
        self._fileReader = fileReader

    def setFileWriter(self, fileWriter: FileWriter):
        if not isinstance(fileWriter, FileWriter):
            raise PluginError("Bad FileWriter: must be an instance of the FileWriter class or any of its child class")
        self._fileWriter = fileWriter

    def load(self):
        """
        Can be overriden in child class. Will be called automatically once before the first call to `process` is issued.
        """
        pass

    def process(self, data: Union[np.ndarray, Iterable[np.ndarray]]) -> Union[np.ndarray, Iterable[np.ndarray]]:
        """
        The main entrypoint of plugins, must be overriden in child class.
        The processed file must be saved at the path pointed by the argument `outFilename`.

        Args:
            data: The data to process

        Returns
            The processed data
        """
        raise NotImplementedError

    def toJson(self) -> dict:
        """
        Generates and returns the JSON representation of the plugin.

        Returns:
            The JSON representation of the plugin as a dict
        """
        return {
            "className": self.__class__.__name__,
            "name": self.name,
            "inType": [inType.value for inType in self.inType],
            "outType": [outType.value for outType in self.outType],
            "parameters": [parameter.toJson(name) for name, parameter in self.parameters.items()],
            "icon": self.icon
        }


class AudioPlugin(BasePlugin):
    """
    Convenience base class for plugins having `audio` as input type.
    """

    sr = PluginParameter("Sample rate", 0)
    """PluginParameter instance holding the sample rate at which the audio file must be loaded,
    the original sample rate is used if set to 0"""

    def __init__(self, name: str, outType: Union[FileType, Iterable[FileType]], icon: Optional[str] = 'settings', outExtension: Optional[Union[str, Iterable[str]]] = None):
        """
        Creates a AudioPlugin instance.

        Args:
            name: The name is the plugin as it will be displayed within the web interface
            outType: The output type of the plugin
            icon: The name of the icon, must be one of the Angular Material Icon list
            outExtension: If specified, overrides the default file extension for the provided output file

        Note:
            Default file extensions for each type are:

            - Image: .png
            - Audio: .wav
            - Video: .mp4
            - Text: .txt
            - Misc: _no extension_
        """
        super(AudioPlugin, self).__init__(name, FileType.AUDIO, outType, icon, outExtension)

    def __call__(self, inFilename: str, outFilename: Union[str, Iterable[str]]):
        """
        Internal call of the plugin, loads the plugin if necessary, then loads the input audio file and calls the
        `process` method.

        Args:
            inFilename: The path of the file to be processed
            outFilename: The path to which the processed file must be written
        """
        if not self._loaded:
            self.load()
            self._loaded = True
        loadSr = self.sr.value if self.sr.value else None
        data, self.sr.value = librosa.load(inFilename, sr=loadSr)
        self.process(data, outFilename)

    def process(self, data: np.ndarray, outFilename: Union[str, Iterable[str]]):
        """
        The main entrypoint of audio plugins, must be overriden in child class.
        The processed file must be saved at the path pointed by the argument `outFilename`.

        Args:
            data: The audio signal as a numpy ndarray
            outFilename: The path to which the processed file must be written
        """
        raise NotImplementedError


class ImagePlugin(BasePlugin):
    """
    Convenience base class for plugins having `image` as input type.
    """

    def __init__(self, name: str, outType: Union[FileType, Iterable[FileType]], icon: Optional[str] = 'settings', outExtension: Optional[Union[str, Iterable[str]]] = None):
        """
        Creates a ImagePlugin instance.

        Args:
            name: The name is the plugin as it will be displayed within the web interface
            outType: The output type of the plugin
            icon: The name of the icon, must be one of the Angular Material Icon list
            outExtension: If specified, overrides the default file extension for the provided output file

        Note:
            Default file extensions for each type are:

            - Image: .png
            - Audio: .wav
            - Video: .mp4
            - Text: .txt
            - Misc: _no extension_
        """
        super(ImagePlugin, self).__init__(name, FileType.IMAGE, outType, icon, outExtension)

    def __call__(self, inFilename: str, outFilename: Union[str, Iterable[str]]):
        """
        Internal call of the plugin, loads the plugin if necessary, then loads the input image file and calls the
        `process` method.

        Args:
            inFilename: The path of the file to be processed
            outFilename: The path to which the processed file must be written
        """
        if not self._loaded:
            self.load()
            self._loaded = True
        data = cv2.imread(inFilename)
        self.process(data, outFilename)

    def process(self, data: np.ndarray, outFilename: Union[str, Iterable[str]]):
        """
        The main entrypoint of image plugins, must be overriden in child class.
        The processed file must be saved at the path pointed by the argument `outFilename`.

        Args:
            data: The image as a numpy ndarray
            outFilename: The path to which the processed file must be written
        """
        raise NotImplementedError
