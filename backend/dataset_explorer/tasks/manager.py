#!/usr/bin/env python
# coding: utf-8

import os
import tempfile
from . import Task, TaskStatus
from threading import Thread
from dataset_explorer.utils import Singleton
from dataset_explorer.flows import FlowManager


class TaskManager(object, metaclass=Singleton):

    TASK_ID = 0

    def __init__(self):
        self.tasks = dict()
        self.workers = dict()
        self.flowManager = FlowManager()

    def getTask(self, taskId: int) -> Task:
        return self.tasks[taskId]

    def getAllTasks(self) -> list:
        return list(self.tasks.values())

    def startTask(self, taskId: int):
        task = self.tasks[taskId]
        if task.status == TaskStatus.IN_PROGRESS or taskId in self.workers.keys():
            return False
        thread = Thread(target=self.taskWorker, args=(task,))
        thread.setDaemon(True)
        self.workers[taskId] = thread
        thread.start()
        return True

    def taskWorker(self, task: Task):
        task.start()
        del self.workers[task.id]

    def createTask(self, flowName: str):
        self.TASK_ID += 1
        flow = self.flowManager.getFlow(flowName)
        task = Task(self.TASK_ID, flow, [])
        self.tasks[task.id] = task
        return task
