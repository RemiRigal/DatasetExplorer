#!/usr/bin/env python
# coding: utf-8

import cv2
from dataset_explorer.io import FileType
from dataset_explorer.plugins import BasePlugin, PluginParameter


class BlackAndWhitePlugin(BasePlugin):

    binary = PluginParameter("Binary", False)
    binaryThreshold = PluginParameter("Binary Threshold", 0.5)

    def __init__(self):
        super(BlackAndWhitePlugin, self).__init__("Black & White", FileType.IMAGE, FileType.IMAGE, icon="invert_colors")

    def process(self, data):
        bw = cv2.cvtColor(data, cv2.COLOR_BGR2GRAY)
        if self.binary.value:
            threshold = max(0, min(1, self.binaryThreshold.value))
            maxValue = 255
            _, bw = cv2.threshold(bw, int(maxValue * threshold), maxValue, cv2.THRESH_BINARY)
        return bw
