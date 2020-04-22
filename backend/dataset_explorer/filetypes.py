#!/usr/bin/env python
# coding: utf-8

import os
from enum import Enum


class FileType(Enum):

    MISC = "misc"
    AUDIO = "audio"
    IMAGE = "image"
    TEXT = "text"
    VIDEO = "video"

    @staticmethod
    def getFileType(filename):
        _, ext = os.path.splitext(filename)
        ext = ext.lower()
        return _EXT_TO_TYPE.get(ext, FileType.MISC)


_EXT_TO_TYPE = {
    ".wav": FileType.AUDIO,
    ".mp3": FileType.AUDIO,
    ".png": FileType.IMAGE,
    ".jpg": FileType.IMAGE,
    ".jpeg": FileType.IMAGE,
    ".txt": FileType.TEXT,
    ".mp4": FileType.VIDEO
}


if __name__ == "__main__":
    print(FileType.getFileType("test.wav"))
    print(FileType.getFileType("other.png"))
    print(FileType.getFileType("image.PNG"))
    print(FileType.getFileType("hello"))
