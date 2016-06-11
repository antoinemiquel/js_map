# js_map

# build app image
docker build -t app_js_map .

# run mongo contener
mkdir /data_js_map
docker run --name mongo_js_map -v /data_js_map:/data/db -p 0.0.0.0:27017:27017 -d mongo

# run contener app
docker run --name app -d -p 80:8080 app_js_map


