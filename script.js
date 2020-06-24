
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
    console.log(type);
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