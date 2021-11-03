#!/usr/bin/env python
# coding: utf-8

import cv2
import soundfile
import numpy as np
from typing import Union, Iterable
from . import DataFile, FileType


class FileReader(object):

    def read(self, dataFile: Union[DataFile, Iterable[DataFile]]) -> Union[np.ndarray, Iterable[np.ndarray]]:
        if isinstance(dataFile, DataFile):
            return self._readFile(dataFile)
        return [self._readFile(df) for df in dataFile]

    def _readFile(self, dataFile: DataFile) -> np.ndarray:
        if dataFile.type == FileType.AUDIO:
            return self._readAudioFile(dataFile)
        if dataFile.type == FileType.Image:
            return self._readImageFile(dataFile)
        if dataFile.type == FileType.VIDEO:
            return self._readVideoFile(dataFile)
        return np.ndarray([])

    @staticmethod
    def _readAudioFile(dataFile: DataFile) -> np.ndarray:
        return soundfile.read(dataFile.path)

    @staticmethod
    def _readImageFile(dataFile: DataFile) -> np.ndarray:
        return cv2.imread(dataFile.path)

    @staticmethod
    def _readVideoFile(dataFile: DataFile) -> np.ndarray:
        raise NotImplementedError
