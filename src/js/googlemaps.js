// google maps
import {getSavedCoords} from './geolocation';

// markers array
let markers = [];

// Adds a marker to the map.
function addMarker(location, map) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: 'img/marker.svg',
        animation: google.maps.Animation.DROP
    });
    markers.push(marker);
}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

export const initMap = () => {
    let defaultCoords;
    let mapBox = document.getElementById('map');
    if(window.localStorage.coords) {
        defaultCoords = getSavedCoords();
    } else {
        defaultCoords = {
            latitude: 50.456191,
            longitude: 30.575257
        }
    }
    let map = new google.maps.Map(mapBox, {
       center: {
           lat: defaultCoords.latitude,
           lng: defaultCoords.longitude
       },
        zoom: 13,
        streetViewControl: false
    });

    mapBox.classList.add('inited');
    //Add listener
    google.maps.event.addListener(map, 'click', function(event) {
        deleteMarkers();
        addMarker(event.latLng, map);

        // write coords to input
        let formCoords = document.getElementById('formCoords');
        let input = formCoords.querySelector('input');

        input.value = `${event.latLng.lat()}, ${event.latLng.lng()}`;
    });
};