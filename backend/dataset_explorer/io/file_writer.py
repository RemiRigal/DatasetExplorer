#!/usr/bin/env python
# coding: utf-8

import cv2
import soundfile
import numpy as np
from typing import Union, Iterable
from . import DataFile, FileType


class FileWriter(object):

    def write(self, filename: Union[DataFile, Iterable[DataFile]], data: Union[np.ndarray, Iterable[np.ndarray]]):
        if isinstance(filename, DataFile):
            return self._writeFile(filename, data)
        return [self._writeFile(n, d) for (n, d) in zip(filename, data)]

    def _writeFile(self, dataFile: DataFile, data: np.ndarray):
        if dataFile.type == FileType.AUDIO:
            self._writeAudioFile(dataFile, data)
        if dataFile.type == FileType.Image:
            self._writeImageFile(dataFile, data)
        if dataFile.type == FileType.VIDEO:
            self._writeVideoFile(dataFile, data)

    @staticmethod
    def _writeAudioFile(dataFile: DataFile, data: np.ndarray):
        soundfile.write(dataFile.path, data[0], data[1])

    @staticmethod
    def _writeImageFile(dataFile: DataFile, data: np.ndarray):
        return cv2.imwrite(dataFile.path, data)

    @staticmethod
    def _writeVideoFile(dataFile: DataFile, data: np.ndarray):
        raise NotImplementedError
