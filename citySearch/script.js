function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48,
            lng: 4
        },
        zoom: 4,
        disableDefaultUI: true
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('input');
    var options = {
        types: ['(cities)']
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    var marker = new google.maps.Marker({
        map: map
    });

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'name']);

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        var bounds = new google.maps.LatLngBounds();
        marker.setPosition(place.geometry.location);

        if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
    });
}
document.addEventListener("DOMContentLoaded", function (event) {
    initAutocomplete();
});