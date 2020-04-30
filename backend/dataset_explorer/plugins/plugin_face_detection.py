#!/usr/bin/env python
# coding: utf-8

import os
import cv2
import dlib
from dataset_explorer.filetypes import FileType
from dataset_explorer.plugins.base import ImagePlugin
from dataset_explorer.plugins.parameters import PluginParameter


class FaceDetectionPlugin(ImagePlugin):

    resize = PluginParameter("Resize Image", False)
    resizeFactor = PluginParameter("Resize Factor", 0.5)

    def __init__(self):
        super(FaceDetectionPlugin, self).__init__("Face Detection", FileType.IMAGE, icon="tag_faces")
        self.faceDetector = None

    def load(self):
        faceDetectorData = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "assets", "mmod_human_face_detector.dat")
        self.faceDetector = dlib.cnn_face_detection_model_v1(faceDetectorData)

    def process(self, data, outFilename):
        if self.resize.value:
            data = cv2.resize(data, (0, 0), fx=self.resizeFactor.value, fy=self.resizeFactor.value)
        allBoundingBoxes = self.faceDetector(data, 1)
        for boundingBox in allBoundingBoxes:
            bb = boundingBox.rect
            cv2.rectangle(data, (bb.left(), bb.top()), (bb.right(), bb.bottom()), (210, 118, 25), thickness=2, lineType=cv2.LINE_AA)
        cv2.imwrite(outFilename, data)
