# coding: utf-8

import os
import librosa
from flask import Flask, request, send_file
from flask_restful import Resource, Api
from flask_cors import CORS
from dataset_explorer.filetypes import FileType


app = Flask(__name__, static_url_path="")
CORS(app)
api = Api(app)

root = os.getenv("DATASET_EXPLORER_ROOT", "")


class StaticFile(Resource):

    def get(self, path):
        if os.path.exists(os.path.join(root, path)):
            return send_file(os.path.join(root, path))
        return []


class DataFiles(Resource):

    def get(self, filename=None):
        fileList = []
        if filename is not None and os.path.exists(os.path.join(root, filename)):
            fileList = [os.path.join(root, filename)]
        elif filename is None:
            fileList = os.listdir(root)
        return [{
            "name": filename,
            "size": os.path.getsize(os.path.join(root, filename)),
            "ext": filename.split(".")[-1],
            "type": FileType.getFileType(filename).value
        } for filename in sorted(fileList)]


class AudioDataFile(Resource):

    def get(self, filename):
        targetSampleRate = request.args.get("sr", default=None, type=int)
        wave, sr = librosa.load(os.path.join(root, filename), sr=targetSampleRate)
        return {"name": filename, "wave": wave.tolist(), "sr": sr}


api.add_resource(StaticFile, "/static/<path:path>")
api.add_resource(DataFiles, "/datafiles", endpoint="datafiles")
api.add_resource(DataFiles, "/datafiles/<path:filename>", endpoint="datafile")
api.add_resource(AudioDataFile, "/datafile/audio/<path:filename>")


if __name__ == "__main__":
     app.run()
