#!/usr/bin/env python
# coding: utf-8

import os
from dataset_explorer.filetypes import FileType


class DataFile(object):

    def __init__(self, name: str, fileType: FileType, ext: str, size: int):
        self.name = name
        self.type = fileType
        self.ext = ext
        self.size = size


if __name__ == "__main__":
    pass
