#!/usr/bin/env python
# coding: utf-8


class PluginError(Exception):
   """Raised when a plugin-based exception occurs"""

class InstantiationError(PluginError):
    """Raised when a plugins fails to instantiate"""

class ProcessError(PluginError):
   """Raised when a plugin failed to process some data"""

class OutputFileNotFound(PluginError):
    """Raised when the output file of a plugin does not exist"""
