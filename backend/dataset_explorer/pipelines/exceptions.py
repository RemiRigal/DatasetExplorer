#!/usr/bin/env python
# coding: utf-8


class PipelineError(Exception):
   """Raised when a pipeline-based exception occurs"""

class LoadError(PipelineError):
    """Raised when a pipeline fails to load"""
