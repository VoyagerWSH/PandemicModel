
// Initialize and add the map
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(2.8,-187.3), mapTypeId: 'roadmap'
    });
}

var input_city = "Barnsdall";//this input should come from the dropdown in index.html select city
city_data = "https://maps.googleapis.com/maps/api/place/findplacefromtext/jsonp?input=".concat(input_city);
city_data = city_data.concat("&inputtype=textquery&fields=formatted_address,geometry,place_id,type&key=YOUR_API_KEY")
console.log(city_data);//this is the final link for the json data file from which you can extract the bounding box coordinates 
  