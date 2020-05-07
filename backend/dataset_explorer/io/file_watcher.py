#!/usr/bin/env python
# coding: utf-8

import pyinotify


class FileWatcherEventHandler(pyinotify.ProcessEvent):

    mask = pyinotify.IN_DELETE | pyinotify.IN_CREATE | pyinotify.IN_MODIFY | pyinotify.IN_MOVED_FROM | pyinotify.IN_MOVED_TO

    def __init__(self, onCreate, onUpdate, onDelete):
        super(FileWatcherEventHandler, self).__init__()
        self.onCreate = onCreate
        self.onUpdate = onUpdate
        self.onDelete = onDelete

    def process_IN_CREATE(self, event):
        self.onCreate(event.pathname)

    def process_IN_MOVED_TO(self, event):
        self.onCreate(event.pathname)

    def process_IN_MOVED_FROM(self, event):
        self.onDelete(event.pathname)

    def process_IN_DELETE(self, event):
        self.onDelete(event.pathname)

    def process_IN_MODIFY(self, event):
        self.onUpdate(event.pathname)


class FileWatcher(object):

    def __init__(self, onCreate, onUpdate, onDelete):
        self.watchManager = pyinotify.WatchManager()
        self.eventHandler = FileWatcherEventHandler(onCreate, onUpdate, onDelete)
        self.threadedNotifier = pyinotify.ThreadedNotifier(self.watchManager, self.eventHandler)
        self.threadedNotifier.start()

    def watch(self, path):
        self.watchManager.add_watch(path, self.eventHandler.mask)


if __name__ == "__main__":
    pass
