#!/usr/bin/env python
# coding: utf-8

import os
import numpy as np
from typing import Union, Iterable
from . import DataFile, FileType


class FileReader(object):

    def read(self, dataFile: Union[DataFile, Iterable[DataFile]]) -> Union[np.ndarray, Iterable[np.ndarray]]:
        if isinstance(dataFile, DataFile):
            return self._readFile(dataFile)
        return [self._readFile(df) for df in dataFile]

    def _readFile(self, dataFile: DataFile) -> np.ndarray:
        pass


if __name__ == "__main__":
    reader = FileReader()
    reader.read("")
