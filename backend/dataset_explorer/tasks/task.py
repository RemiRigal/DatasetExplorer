#!/usr/bin/env python
# coding: utf-8

import os
import time
from typing import Union, Iterable
from enum import Enum
from flask_sse import sse
from dataset_explorer.flows import Flow
from dataset_explorer.io import DataFile


class TaskStatus(Enum):

    QUEUED = "queued"
    IN_PROGRESS = "inProgress"
    DONE = "done"


class Task(object):

    def __init__(self, taskId: int, flow: Flow, inputs: Iterable[DataFile]):
        self.id = taskId
        self.status = TaskStatus.QUEUED
        self.flow = flow
        self.inputs = inputs
        self.outputs = None

    def start(self):
        self.status = TaskStatus.QUEUED
        print("Doing stuff...")
        self.flow.process(self.inputs)
        print("Done")
        self.status = TaskStatus.DONE

    @property
    def status(self):
        return self._status

    @status.setter
    def status(self, newStatus: TaskStatus):
        # sse.publish({
        #     "message": f"Task {self.id} has new status {newStatus.value}",
        #     "taskId": self.id,
        #     "status": newStatus.value
        # }, type="taskStatus")
        self._status = newStatus
