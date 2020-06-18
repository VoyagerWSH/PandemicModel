
var input_city = 'Barnsdall';//this input should come from the dropdown in index.html select city

// Initialize and add the map
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(2.8,-187.3), mapTypeId: 'roadmap'
    });

infowindow = new google.maps.InfoWindow();

var request = {
    query: input_city,
    fields: ['name', 'formatted_address', 'geometry', 'place_id' , 'types'],
};

var service = new google.maps.places.PlacesService(map);
var id;
var location;
var north_east;
var south_west;

service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        location = results[i].geometry.location;
        north_east = results[i].geometry.viewport.getNorthEast();//northeast bound
        south_west = results[i].geometry.viewport.getSouthWest();//southwest bound
        console.log(location.toString());//just for reference
        console.log(north_east.toString());//just for reference
        console.log(south_west.toString());//just for reference
        createMarker(results[i]);
      }
    }
});
}

function createMarker(place, place_type) {
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