#!/usr/bin/env python
# coding: utf-8

import os
from . import FileType


class DataFile(object):

    def __init__(self, name: str, filename: str, path: str, fileType: FileType, ext: str, size: int, urlPrefix: str=None):
        self.name = name
        self.filename = filename
        self.path = path
        self.type = fileType
        self.ext = ext
        self.size = size
        self.urlPrefix = urlPrefix or "/static"

    @property
    def id(self):
        return self.filename.replace(".", "") + str(self.size)

    @property
    def url(self):
        return f"{self.urlPrefix}/{self.filename}"

    def toJson(self):
        return {
            "id": self.id,
            "name": self.name,
            "size": self.size,
            "ext": self.ext,
            "type": self.type.value,
            "url": self.url
        }

    @staticmethod
    def fromPath(path, name=None, urlPrefix=None):
        filename = os.path.basename(path)
        name = name or filename
        fileType = FileType.getFileType(filename)
        _, ext = os.path.splitext(path)
        size = os.path.getsize(path)
        return DataFile(name, filename, path, fileType, ext, size, urlPrefix)

    def __str__(self):
        return f"Data file: {self.name} ({self.filename})\n" + \
               f"\tId: {self.id}\n" + \
               f"\tSize: {round(self.size / (1024.0 * 1024.0), 2)}MB\n" + \
               f"\tType: {self.type.value}\n" + \
               f"\tStatic URL prefix: {self.urlPrefix}"

    def __hash__(self):
        return hash(self.id)


if __name__ == "__main__":
    dataFile = DataFile.fromPath("../../data/faces.jpg")
    print(dataFile)
