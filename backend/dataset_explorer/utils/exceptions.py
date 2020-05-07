#!/usr/bin/env python
# coding: utf-8


class BackendError(Exception):
   """Raised when a backend exception occurs"""

class DatasetDirectoryError(BackendError):
    """Raised when the environment variable DATASET_EXPLORER_ROOT has not been set or points to an invalid location"""
