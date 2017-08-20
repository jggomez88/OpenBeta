mapboxgl.accessToken = 'pk.eyJ1Ijoiamdnb21lejg4IiwiYSI6ImNpeWdjcjM1eDAzNGgzOHJ3ZTh2aWNhOXMifQ.rP6UZz16DXfkW6KoDFdfGA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/outdoors-v10', //stylesheet location
    center: [-74.16222, 41.14358], // starting position
    zoom: 9 // starting zoom
});

map.on('load', function() {
     map.addLayer({
        'id': 'Climbing Routes',
        'type': 'circle',
        'source':{
            type: 'vector',
            url: 'mapbox://jggomez88.cj3ak53fi010a2wnz7ybteodg-7ijj3'
        },
        'source-layer': 'Climbing_Routes',
        'layout': {
            'visibility': 'visible',
        },
        'paint':{
            'circle-radius': 4,
            'circle-color': {
                property: 'climb_type',
                type: 'categorical',
                stops: [
                    ['boulder','#0066ff'],
                    ['sport', '#ff0000'],
                    ['trad', '#ff9900'],
                    ['top-rope', '#9900ff']
                ]
            }
        }
    });
    map.addLayer({
        'id': 'Sub-Areas',
        'type': 'fill',
        'source':{
            type: 'vector',
            url: 'mapbox://jggomez88.cj3aj5rnh00of2wmemrwpp73j-0gnrg'
        },
        'source-layer': 'Sub-Areas',
        'layout': {
            'visibility': 'visible',
        },
        'paint':{
            "fill-color": "#FFA500",
            "fill-opacity": .5
        }
    }, 'Climbing Routes');
    map.addLayer({
        'id':'Climbing Areas',
        'type': 'fill',
        'source': {
            type: 'vector',
            url: 'mapbox://jggomez88.cj37uk0br01do2qtl2vbyocc8-42cdc'
        },
        'source-layer': 'Climbing_Areas',
        'layout': {
            'visibility': 'visible'
        },
        'paint':{
            "fill-color": "#00ffff",
            "fill-opacity": .25
        }
    }, 'Sub-Areas');
    });

//toggle menu layers

var toggleableLayerIds = [ 'Climbing Areas', 'Sub-Areas', 'Climbing Routes' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('toggle_menu');
    layers.appendChild(link);
}
   
//toggle menu basemap

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    var test = map.getStyle()
    map.setStyle('mapbox://styles/mapbox/' + layerId + '-v10')
    map.on('style.load', function() {
        
    })
};

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
};

//geolocate control
map.addControl(new mapboxgl.GeolocateControl());

//popup Climbing Routes
 map.on('click', 'Climbing Routes', function (e) {
     var feature = e.features[0];
             var route_name = feature.properties.route_name
             var climb_grade = feature.properties.climb_grade
             var climb_type = feature.properties.climb_type
             var desc = feature.properties.description
             var letter_grade = feature.properties.letter_grade
             var pitches = feature.properties.pitches
             var photo = feature.properties.photo
             var route_popup = new mapboxgl.Popup()
                .setLngLat(e.features[0].geometry.coordinates)
                .setHTML('<h3><u>'+route_name+'</u></h3><p>'+'<i>Grade: </i><b>'+climb_grade+letter_grade+'</b><br>'+'<i>Type: </i><b>'+climb_type+'</b></br></p><p>'+'<i>Beta:</i><br>'+desc+'</br></p>')
                .addTo(map);
         });

// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'Climbing Routes', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'Climbing Routes', function () {
        map.getCanvas().style.cursor = '';
    });
