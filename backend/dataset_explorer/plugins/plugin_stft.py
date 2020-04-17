#!/usr/bin/env python
# coding: utf-8

import cv2
import tempfile
import numpy as np
from scipy.signal import stft
from matplotlib.figure import Figure
from dataset_explorer.filetypes import FileType
from dataset_explorer.plugins.base import AudioPlugin
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas


class STFTPlugin(AudioPlugin):

    def __init__(self):
        super(STFTPlugin, self).__init__("STFT", FileType.IMAGE, icon="bar_chart", outExtension="png")

    def process(self, data, outFilename, **kwargs):
        sr = kwargs.get("sr")
        nfft = kwargs.get("nfft", 2048)
        nperseg = int(0.025 * sr)
        noverlap = int(0.015 * sr)
        f, t, audioSTFT = stft(data, fs=sr, nperseg=nperseg, noverlap=noverlap, nfft=nfft, boundary=None)
        figure = Figure(dpi=200)
        canvas = FigureCanvas(figure)
        axis = figure.gca()
        axis.pcolormesh(t, f, np.power(np.abs(audioSTFT), 0.3))
        canvas.draw()
        width, height = figure.get_size_inches() * figure.get_dpi()
        image = np.frombuffer(canvas.tostring_rgb(), dtype='uint8').reshape(int(height), int(width), 3)
        cv2.imwrite(outFilename, image[:, :, ::-1])
        return outFilename


if __name__ == "__main__":
    plugin = STFTPlugin()
    f = plugin("/home/remi/Downloads/Audios/_0cxZ4Yh-LU_220.52_229.72.wav", **{"sr": 16000})
