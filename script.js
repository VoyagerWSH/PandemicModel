var markers = [];
var map;

document.addEventListener("DOMContentLoaded", function (event) {
    initMap();
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48,
            lng: 4
        },
        zoom: 4,
        disableDefaultUI: true
    });

    choseLocationAutocomplete();
}

function choseLocationAutocomplete() {
    infowindow = new google.maps.InfoWindow();
    // Create the search box and link it to the UI element.
    var input = document.getElementById('input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['name', 'formatted_address', 'geometry', 'place_id' , 'types']);

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        returnPolygon(place);
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        var bounds = new google.maps.LatLngBounds();

        if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
        nearbySearch(place);
    });
}

function nearbySearch(place) {
    clearMarkers();
    var chose = document.getElementById('types');
    var type = chose.options[chose.selectedIndex].value;
    var search = {
        bounds: place.geometry.viewport,
        types: [type]
      };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(search, callback);
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMarker(results);
        }
    }
}

function createMarker(places) {
    places.forEach(place => {
        let marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
        });
        markers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Type: ' + place.types + '</div>');
        infowindow.open(map, this);
        });
    });
}

function clearMarkers() {
    markers.forEach(function (m) { m.setMap(null); });
    markers = [];
}

function returnPolygon(result) {
    console.log(result.name.toString());
    const endpoint = 'https://nominatim.openstreetmap.org/search?q=' + result.name.toString() + '&format=json&addressdetails=1&limit=1&polygon_geojson=1';
    fetch(endpoint, {cache: 'no-cache'}).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message)
      }).then(jsonResponse => {
        renderResponse(jsonResponse);
      })
}
function polygonInfo(result) {
    //result parameter has string with bounding polygon coordinates
    console.log(result.name.toString());
    const overpass_url = 'http://overpass-api.de/api/interpreter?data=';
    const overpass_query = '""[out:json];
(node["amenity"](poly:"' + result.name.toString() + '");
 way["amenity"](poly:"' + result.name.toString() + '");
 rel["amenity"](poly:"' + result.name.toString() + '");
);
out center;
""';
    const real_url = overpass_url + overpass_query;
    fetch(real_url, {cache: 'no-cache'}).then(response => {
	    if (response.ok) {
		return response.json();
	    }
	    throw new Error('Request failed!');
	}, networkError => {
	    console.log(networkError.message)
	}).then(jsonResponse => {
		renderResponse(jsonResponse);
	    })
}
const renderResponse = (location) => {
    for (var i = 0; i < location.length; i++) {
        /*
         location is the result which looks something like:
         [{"place_id":105581712,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
         "osm_type":"way","osm_id":90394480,"boundingbox":["52.5487473","52.5488481","-1.816513","-1.8163464"],
         "lat":"52.5487921","lon":"-1.8164308339635031","display_name":"135, Pilkington Avenue, Sutton Coldfield, 
         Birmingham, West Midlands Combined Authority, West Midlands, England, B72 1LH, United Kingdom",
         "class":"building","type":"residential","importance":0.411,"address":{"house_number":"135","road":
         "Pilkington Avenue","town":"Sutton Coldfield","city":"Birmingham","county":"West Midlands Combined Authority",
         "state_district":"West Midlands","state":"England","postcode":"B72 1LH","country":"United Kingdom",
         "country_code":"gb"},
         "geojson":{"type":"Polygon","coordinates":[[[-1.816513,52.5487566],[-1.816434,52.5487473],[-1.816429,52.5487629],
         [-1.8163717,52.5487561],[-1.8163464,52.5488346],[-1.8164599,52.5488481],[-1.8164685,52.5488213],
         [-1.8164913,52.548824],[-1.816513,52.5487566]]]}}]

         In this the "geojson" feature of the json file is the geojson object we have to read and return its polygon 
         coordinates. The type of this can be polygon or Multipolygon, so be careful of that. If its a multipolygon, then
         would probably have to return all polygon seperately.
        */
        for(var j = 0; j < location[i].geojson.coordinates.length; j++) {
            console.log(location[i].geojson.coordinates.toString());//need to clean this up as it just 
        }
    }
    
}

