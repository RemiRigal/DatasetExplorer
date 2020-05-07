#!/usr/bin/env python
# coding: utf-8

import os
from collections import OrderedDict
from dataset_explorer.io import DataFile, FileWatcher
from dataset_explorer.utils import getDatasetDirectory


class Dataset(object):

    def __init__(self):
        self.root = getDatasetDirectory()
        self.dataFiles = OrderedDict()
        self._discoverFiles()
        self.fileWatcher = FileWatcher(self.onFileCreatedOrUpdated, self.onFileCreatedOrUpdated, self.onFileDeleted)
        self.fileWatcher.watch(self.root)

    def getAll(self):
        return [dataFile.toJson() for dataFile in self.dataFiles.values()]

    def get(self, filename):
        return self.dataFiles.get(filename, None)

    def _discoverFiles(self):
        fileList = [filename for filename in os.listdir(self.root) if os.path.isfile(os.path.join(self.root, filename))]
        for filename in sorted(fileList):
            filePath = os.path.join(self.root, filename)
            self.dataFiles[filename] = DataFile.fromPath(filePath)

    def onFileCreatedOrUpdated(self, path):
        filename = os.path.basename(path)
        self.dataFiles[filename] = DataFile.fromPath(path)
        self.dataFiles = OrderedDict(sorted(self.dataFiles.items(), key=lambda pair: pair[0]))

    def onFileDeleted(self, path):
        filename = os.path.basename(path)
        del self.dataFiles[filename]


if __name__ == "__main__":
    os.environ["DATASET_EXPLORER_ROOT"] = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "data")
    dataset = Dataset()
