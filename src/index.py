from flask import Flask, render_template, Response, jsonify
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__, template_folder='templates')
client = MongoClient('localhost', 27017)
db = client.autolib
collection = db.points


@app.route('/')
def accueil():
    return render_template('index.html', titre="AutoLib")


@app.route('/data')
def data():
    docs = []
    cursor = collection.find()
    for document in cursor:
        docs.append(document)
    js = dumps(docs)
    resp = Response(js, status=200, mimetype='application/json')
    return resp

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
