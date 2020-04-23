# coding: utf-8

import os
import librosa
from flask import Flask, request, send_file, send_from_directory
from flask_restful import Resource, Api
from flask_cors import CORS
from dataset_explorer.filetypes import FileType
from dataset_explorer.plugins.manager import PluginManager


root = os.getenv("DATASET_EXPLORER_ROOT", "")
pluginManager = PluginManager()

app = Flask(__name__, static_url_path="")
CORS(app)
api = Api(app)


class StaticFile(Resource):

    def get(self, path):
        if os.path.exists(os.path.join(root, path)):
            return send_from_directory(root, path)
        return []


class DataFiles(Resource):

    def get(self, filename=None):
        fileList = []
        if filename is not None and os.path.exists(os.path.join(root, filename)):
            fileList = [filename]
        elif filename is None:
            fileList = os.listdir(root)
        return [{
            "id": name.split(".")[0],
            "name": name,
            "size": os.path.getsize(os.path.join(root, name)),
            "ext": name.split(".")[-1],
            "type": FileType.getFileType(name).value,
            "url": "/static/{}".format(name)
        } for name in sorted(fileList)]


class AudioDataFile(Resource):

    def get(self, filename):
        targetSampleRate = request.args.get("sr", default=None, type=int)
        wave, sr = librosa.load(os.path.join(root, filename), sr=targetSampleRate)
        return {"name": filename, "wave": wave.tolist(), "sr": sr}


class Plugins(Resource):

    def get(self, name=None, filename=None):
        if name is None:
            return pluginManager.getAvailablePlugins()
        kwargs = dict()
        filePath = os.path.join(root, filename)
        return pluginManager.applyPlugin(name, filePath, **kwargs)


class ProcessedFile(Resource):

    def get(self, name, filename):
        filePath = os.path.join(root, filename)
        return send_file(pluginManager.getPluginFile(name, filePath))


api.add_resource(StaticFile, "/static/<path:path>")
api.add_resource(DataFiles, "/datafiles", endpoint="datafiles")
api.add_resource(DataFiles, "/datafiles/<path:filename>", endpoint="datafile")
api.add_resource(AudioDataFile, "/datafile/audio/<path:filename>")
api.add_resource(Plugins, "/plugins", endpoint="plugins")
api.add_resource(ProcessedFile, "/plugins/static/<string:name>/<path:filename>")
api.add_resource(Plugins, "/plugins/<string:name>/<path:filename>", endpoint="plugin")


if __name__ == "__main__":
     app.run(host="0.0.0.0")
