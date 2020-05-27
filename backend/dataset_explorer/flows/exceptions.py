#!/usr/bin/env python
# coding: utf-8


class FlowError(Exception):
   """Raised when a flow-based exception occurs"""

class LoadError(FlowError):
    """Raised when a flow fails to load"""
