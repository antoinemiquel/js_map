var map
var markers = new Array();
var points

function show_map() {
    var startPoint = {"name" : "Notre Dame", "lat" : 48.85309478208657, "lon" : 2.348949909210205}
    map = L.map('map').setView([ startPoint["lat"], startPoint["lon"] ], 16);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
    map.on('zoomend', function(e) {
        on_change(map)
    })
    map.on('moveend', function(e) {
        on_change(map)
    })
    on_change(map)
}

function on_change(map) {
    area = get_bounds(map)
    del_markers(map)
    load_data(area)
    show_bounds(map);
}

function load_data(area) {
    url = "data/" + $.param(area)
    $.ajax({
        url: document.location.href + url,
    })
    .done(function(data) {
        add_markers(map, data)
    })
    .fail(function() {
        alert("Ajax failed to fetch data")
    })
}

function show_bounds(map) {
    bounds = map.getBounds()
    west = bounds.getWest()
    east = bounds.getEast()
    south = bounds.getSouth()
    north = bounds.getNorth()
    console.log("Nord : " + north + " - Sud : " + south + " - Est : " + east + " - Ouest : " + west)
}

function get_bounds(map) {
    bounds = map.getBounds()
    west = bounds.getWest()
    east = bounds.getEast()
    south = bounds.getSouth()
    north = bounds.getNorth()
    return { "north" : north, "south" : south, "east": east, "west": west }
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

function del_markers(map) {
    for (var i in markers) {
        map.removeLayer(markers[i])
    }
    markers = []
}