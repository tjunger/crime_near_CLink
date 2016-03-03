/**
 * Tim Unger
 * 2/27/16
 */

var map;
var markers = [];

function initMap() {
    // Create a map object centered approx. at CenturyLink Field
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 47.5952, lng: -122.3316},
        scrollwheel: false,
        zoom: 13
    });
    // Helper functions to load markers and show the distance
    drawCircle(map);
    addMarkers(map, 0);

    // Attempting to re-center map on resize. Did not work, left in to remind me to revisit.
    map.setCenter({lat: 47.5952, lng: -122.3316});
}

function drawCircle(map){
    // Draws a circle with 1 mile radius around CenturyLink
    var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0,
        map: map,
        center: map.center,
        radius: 1609.34
    });
}

function addMarkers(map, offset){
    /*
     * Gets 1000 crimes committed within one mile of CenturyLink Field (1000 is default SoQL limit, larger numbers dramatically
     * affect load time, more that 50000 results in data set, so pulling full list would require multiple API calls)
     */
    $.ajax({
        type: 'GET',
        url: 'https://data.seattle.gov/resource/3k2p-39jp.json?$offset=' + offset + '&$where=within_circle(incident_location, 47.5952, -122.3316, 1609.34)',
        success: function (data) {
            dataToMarkers(map, data);
        }
    });
}

// Places Markers for each incident in the dataset, labels each by event clearance date and group.
function dataToMarkers(map, temp){
    for (var i = 0; i < temp.length; i++) {
        crime = temp[i];
        crimeDate = new Date(crime.event_clearance_date);
        var lng = parseFloat(crime.incident_location.longitude);
        var lat = parseFloat(crime.incident_location.latitude);
        // Adds markers to Google Map while giving date-time and crime type when you hover over each marker
        var marker = new google.maps.Marker({
            position : {lat: lat, lng: lng},
            map: map,
            title: crime.event_clearance_group + " at " + crimeDate
        });

        markers.push(marker);

    }
}

function updateMap(){
    deleteMarkers();
    addMarkers(map, document.getElementById('range').value);
}

// Note: These two methods are based on example from Google Maps API.

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    removeAllOnMap();
    markers = [];
}

// Sets the map on all markers in the array.
function removeAllOnMap() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}