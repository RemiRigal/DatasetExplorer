#!/usr/bin/env python
# coding: utf-8

import cv2
from dataset_explorer.io import FileType
from dataset_explorer.plugins import BasePlugin


class LaplacianPlugin(BasePlugin):

    def __init__(self):
        super(LaplacianPlugin, self).__init__("Laplacian Derivative", FileType.IMAGE, FileType.IMAGE, icon="border_clear")

    def process(self, data):
        return cv2.Laplacian(data, cv2.CV_32F)
