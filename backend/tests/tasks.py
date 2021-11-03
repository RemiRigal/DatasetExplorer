#!/usr/bin/env python
# coding: utf-8

import cv2
import time
from dataset_explorer.tasks import Task, TaskManager, TaskStatus

if __name__ == "__main__":
    manager = TaskManager()

    task = manager.createTask("Black & White")

    print(f"Task (id: {task.id}) | {task.status.value} | Flow: {task.flow.name}")

    manager.startTask(task.id)

    while task.status != TaskStatus.DONE:
        print("Waiting...")
        time.sleep(0.5)

