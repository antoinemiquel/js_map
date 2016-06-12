from bson.json_util import dumps
import json


def query_area(collection, north, south, east, west):
    cursor = collection.aggregate([
        {"$match": {"fields.field13": {"$elemMatch": {"$lt": north, "$gt": south}}}},
        {"$match": {"fields.field13": {"$elemMatch": {"$lt": east, "$gt": west}}}}
    ])
    docs = []
    for line in cursor:
        docs.append(line)
    js = dumps(docs)
    return js


def query_all(collection):
    cursor = collection.find()
    docs = []
    for line in cursor:
        docs.append(line)
    js = dumps(docs)
    return js


def data_load(collection, data_file):
    with open(data_file) as json_data:
            points = json.load(json_data)
            json_data.close()
    for point in points:
        collection.insert(point)
