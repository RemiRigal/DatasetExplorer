#!/usr/bin/env python
# coding: utf-8

import os
import numpy as np
from typing import Union, Iterable
from . import DataFile


class FileWriter(object):

    def write(self, filename: Union[DataFile, Iterable[DataFile]], data: Union[np.ndarray, Iterable[np.ndarray]]):
        pass

