from pymongo import MongoClient
import json

client = MongoClient('localhost', 27017)
db = client.autolib
collection = db.points

collection.remove()

with open('static/js/data.js') as json_data:
    data = json.load(json_data)
    json_data.close()

for point in data:
    collection.insert(point)
