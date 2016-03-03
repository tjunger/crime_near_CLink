/*
 * Tim Unger
 * 2/28/16
 */

getRecords(100000, 102000);

// Looping through increasing the offset instead of increasing the limit, because the load time seems to be better.
// Loads blocks of 1000 into the table.
function getRecords(start, maxRecords){
    var offset = start;
    while(offset < maxRecords){
        getData(offset);
        offset += 1000;
    }
    return offset;
}

function getData(offset){
    jQuery.ajax({
        type: 'GET',
        url: 'https://data.seattle.gov/resource/3k2p-39jp.json?$offset='+offset+'&$where=within_circle(incident_location, 47.593307, -122.3343541, 1609.34)',
        success: function (data){
            loadTable(data);
        }
    });
}

function loadTable(temp) {
    // Adds table rows dynamically. Headers are in index.html.
    var tableBody = document.createElement('tbody');
    tableBody.ID = 'crimeTable';

    for (var i = 0; i < temp.length; i++) {
        var crime = temp[i];

        var tableRow = document.createElement('tr');

        var tableData1 = document.createElement('td');
        var tDataText1 = document.createTextNode(crime.cad_event_number);
        tableData1.appendChild(tDataText1);
        crimeDate = new Date(crime.event_clearance_date);
        var tableData2 = document.createElement('td');
        var tDataText2 = document.createTextNode(crimeDate);
        tableData2.appendChild(tDataText2);

        var tableData3 = document.createElement('td');
        var tDataText3 = document.createTextNode(crime.hundred_block_location);
        tableData3.appendChild(tDataText3);

        var tableData4 = document.createElement('td');
        var tDataText4 = document.createTextNode(crime.longitude);
        tableData4.appendChild(tDataText4);

        var tableData5 = document.createElement('td');
        var tDataText5 = document.createTextNode(crime.latitude);
        tableData5.appendChild(tDataText5);

        var tableData6 = document.createElement('td');
        var tDataText6 = document.createTextNode(crime.event_clearance_group);
        tableData6.appendChild(tDataText6);

        tableRow.appendChild(tableData1);
        tableRow.appendChild(tableData2);
        tableRow.appendChild(tableData3);
        tableRow.appendChild(tableData4);
        tableRow.appendChild(tableData5);
        tableRow.appendChild(tableData6);

        tableBody.appendChild(tableRow);
    }

    document.getElementById('datatable').appendChild(tableBody);
}
