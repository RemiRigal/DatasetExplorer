#!/usr/bin/env python
# coding: utf-8

import cv2
import numpy as np
from scipy.signal import stft
from matplotlib.figure import Figure
from dataset_explorer.io.filetypes import FileType
from dataset_explorer.plugins.base import AudioPlugin
from dataset_explorer.plugins.parameters import PluginParameter
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas


class STFTPlugin(AudioPlugin):

    nfft = PluginParameter("nfft", 2048)
    segmentLengthMs = PluginParameter("Segment Length (ms)", 25)
    overlapMs = PluginParameter("Segment Overlap (ms)", 15)
    powerLaw = PluginParameter("Power Law", 0.3)

    def __init__(self):
        super(STFTPlugin, self).__init__("STFT", FileType.IMAGE, icon="bar_chart", outExtension="png")

    def process(self, data, outFilename):
        nfft = self.nfft.value
        nperseg = int(self.segmentLengthMs.value * self.sr.value / 1000.0)
        noverlap = int(self.overlapMs.value * self.sr.value / 1000.0)
        f, t, audioSTFT = stft(data, fs=self.sr.value, nperseg=nperseg, noverlap=noverlap, nfft=nfft, boundary=None)
        figure = Figure(dpi=200)
        canvas = FigureCanvas(figure)
        axis = figure.gca()
        axis.pcolormesh(t, f, np.power(np.abs(audioSTFT), self.powerLaw.value))
        canvas.draw()
        width, height = figure.get_size_inches() * figure.get_dpi()
        image = np.frombuffer(canvas.tostring_rgb(), dtype="uint8").reshape(int(height), int(width), 3)
        cv2.imwrite(outFilename, image[:, :, ::-1])
