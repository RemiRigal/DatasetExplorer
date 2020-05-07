#!/usr/bin/env python
# coding: utf-8

import os
from dataset_explorer.utils.exceptions import DatasetDirectoryError


def getDatasetDirectory():
    DATASET_EXPLORER_ROOT = "DATASET_EXPLORER_ROOT"
    if DATASET_EXPLORER_ROOT not in os.environ:
        raise DatasetDirectoryError(
            f"The environment variable {DATASET_EXPLORER_ROOT} must be set to the root path of the dataset directory")
    root = os.getenv("DATASET_EXPLORER_ROOT")
    if not os.path.exists(root) or not os.path.isdir(root):
        raise DatasetDirectoryError(f"The provided dataset directory {root} does not exists")
    if len(os.listdir(root)) == 0:
        raise DatasetDirectoryError(f"The provided dataset directory {root} is empty")
    return root


def getPluginsPath():
    DATASET_EXPLORER_PLUGINS = "DATASET_EXPLORER_PLUGINS"
    return [path for path in os.getenv(DATASET_EXPLORER_PLUGINS, "").split(":") if path]
