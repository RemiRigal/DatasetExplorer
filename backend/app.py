# coding: utf-8

from flask_cors import CORS
from flask_restful import Api
from dataset_explorer.plugins import PluginManager
from dataset_explorer.utils import getDatasetDirectory
from dataset_explorer.app import Dataset, PipelineResource
from flask import Flask, request, send_from_directory, abort, jsonify


root = getDatasetDirectory()
pluginManager = PluginManager()
dataset = Dataset()

app = Flask(__name__, static_url_path="")
cors = CORS(app)
api = Api(app)


####################################### Static Files #######################################

@app.route("/static/<path:path>", methods=["GET"])
def getStaticFile(path):
    return send_from_directory(root, path)

@app.route("/plugins/static/<path:filename>", methods=["GET"])
def getStaticProcessedFile(filename):
    return send_from_directory(pluginManager.staticDirectory, filename)


####################################### Data Files #######################################

@app.route("/datafiles", methods=["GET"])
def getDataFiles():
    return jsonify(dataset.getAll())

@app.route("/datafiles/<path:filename>", methods=["GET"])
def getDataFile(filename):
    dataFile = dataset.get(filename)
    if dataFile is not None:
        return dataFile.toJson()
    return abort(404)


####################################### Plugins #######################################

@app.route("/plugins", methods=["GET"])
def getPlugins():
    return jsonify(pluginManager.getAvailablePlugins())

@app.route("/plugins/<string:pluginName>/<path:filename>", methods=["POST"])
def applyPlugin(pluginName, filename):
    dataFile = dataset.get(filename)
    if dataFile is not None:
        params = request.json or dict()
        return pluginManager.applyPlugin(pluginName, dataFile, params).toJson()
    return abort(404)


####################################### Pipelines #######################################
api.add_resource(PipelineResource, "/pipelines", endpoint="pipelines")
api.add_resource(PipelineResource, "/pipelines/<string:name>", endpoint="pipeline")


if __name__ == "__main__":
    app.run(host="0.0.0.0")
