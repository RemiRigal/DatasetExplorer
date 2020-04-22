#!/usr/bin/env python
# coding: utf-8

import cv2
from dataset_explorer.filetypes import FileType
from dataset_explorer.plugins.base import ImagePlugin


class BlackAndWhitePlugin(ImagePlugin):

    def __init__(self):
        super(BlackAndWhitePlugin, self).__init__("Black & White", FileType.IMAGE, "invert_colors")

    def process(self, data, outFilename, **kwargs):
        bw = cv2.cvtColor(data, cv2.COLOR_BGR2GRAY)
        cv2.imwrite(outFilename, bw)
