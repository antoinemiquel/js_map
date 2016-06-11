var map
var markers = new Array();

function show_map() {
    map = L.map('map').setView([ startPoint["lat"], startPoint["lon"] ], 15);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
    map.on('zoomend', function(e) {
        show_bounds(map);
    })
    map.on('moveend', function(e) {
        show_bounds(map);
    })
    add_markers(map, points)
}

function show_bounds(map) {
    bounds = map.getBounds()
    west = bounds.getWest()
    east = bounds.getEast()
    south = bounds.getSouth()
    north = bounds.getNorth()
    console.log("Nord : " + north + " - Sud : " + south + " - Est : " + east + " - Ouest : " + west)
}

function add_markers(map, points) {
    for (var i in points) {
        var lat = points[i]["fields"]["field13"][0]
        var lon = points[i]["fields"]["field13"][1]
        var name = points[i]["fields"]["nom_de_la_station"]
        var nb = points[i]["fields"]["places_autolib"]
        marker = L.marker([ lat, lon ]).addTo(map)
            .bindPopup( name + "<BR>" + "Nombre de places : " + nb);
        markers.push(marker)
    }
}