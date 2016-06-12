from flask import Flask, render_template, Response
from pymongo import MongoClient
from urlparse import parse_qs
from query import query_area, data_load, query_all

app = Flask(__name__, template_folder='templates')
client = MongoClient('localhost', 27017)
db = client.autolib
collection = db.points


@app.route('/')
def index():
    if collection.count() == 0:
        print("Data import :")
        data_load(collection, 'static/js/data.js')
        print("ok")
    return render_template('index.html', titre="AutoLib")


@app.route('/data', defaults={'area': None})
@app.route('/data/<string:area>')
def data(area):
    if area:
        query = parse_qs(area)
        north = float(query["north"][0])
        south = float(query["south"][0])
        east = float(query["east"][0])
        west = float(query["west"][0])
        js = query_area(collection, north, south, east, west)
    else:
        js = query_all(collection)
    return Response(js, status=200, mimetype='application/json')


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
