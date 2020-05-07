#!/usr/bin/env python
# coding: utf-8

import cv2
from dataset_explorer.io.filetypes import FileType
from dataset_explorer.plugins.base import ImagePlugin


class LaplacianPlugin(ImagePlugin):

    def __init__(self):
        super(LaplacianPlugin, self).__init__("Laplacian Derivative", FileType.IMAGE, icon="border_clear")

    def process(self, data, outFilename):
        data = cv2.Laplacian(data, cv2.CV_32F)
        cv2.imwrite(outFilename, data)
