/**
 * Tim Unger
 * 2/27/16
 */

getCatagoryCounts();

// Gets count of all crimes by clearance group and orders by count in descending order
function getCatagoryCounts() {
    $.ajax({
        type: 'GET',
        url: 'https://data.seattle.gov/resource/3k2p-39jp.json?$select=count(cad_event_number) AS count,event_clearance_group' +
        '&$where=within_circle(incident_location, 47.593307, -122.3343541, 1609.34)&$group=event_clearance_group&$ORDER=count DESC',
        success: function(data){
            buildList(data);
        }

    });
}

function buildList(temp){
    //lists crimes by group and count for that group, should be up to date on load
    for (var i = 0; i < temp.length; i++) {
        var crime = temp[i];
        var crimeList = document.createElement('li');
        var crimeText = document.createTextNode(crime.event_clearance_group + ": " + crime.count);
        crimeList.appendChild(crimeText);
        document.getElementById('crimes').appendChild(crimeList);
    }
}
