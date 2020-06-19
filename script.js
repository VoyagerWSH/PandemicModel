
function initAutocomplete() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48,
            lng: 4
        },
        zoom: 4,
        disableDefaultUI: true
    });

    infowindow = new google.maps.InfoWindow();
    // Create the search box and link it to the UI element.
    var input = document.getElementById('input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    var place;
    var id;
    var location;
    var north_east;
    var south_west;

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['name', 'formatted_address', 'geometry', 'place_id' , 'types']);

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    autocomplete.addListner('place_changed', function () {
        place = autocomplete.getPlace();
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
        id = place.place_id;
        location = place.geometry.location;
        north_east = place.geometry.viewport.getNorthEast();//northeast bound
        south_west = place.geometry.viewport.getSouthWest();//southwest bound
        console.log(id);//just for reference
        console.log(location.toString());//just for reference
        console.log(north_east.toString());//just for reference
        console.log(south_west.toString());//just for reference
        nearbySearch(place);
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
    initAutocomplete();
});

function nearbySearch(place) {
    var search = {
        bounds: place.geometry.viewport,
        types: ['lodging']
      };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(search, callback);
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            }
        }
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
      'Type: ' + place.types + '</div>');
      infowindow.open(map, this);
    });
}