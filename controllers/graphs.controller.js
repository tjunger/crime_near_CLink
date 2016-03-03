/**
 * Tim Unger
 * 2/28/16
 */
var chartWidth = window.innerWidth * .70;
getCatagoryCounts();


window.onresize = function (){
    chartWidth = window.innerWidth * .70;
};


// Gets count of all crimes by clearance group and orders by count in descending order
function getCatagoryCounts() {
    $.ajax({
        type: 'GET',
        url: 'https://data.seattle.gov/resource/3k2p-39jp.json?$select=count(cad_event_number) AS count,event_clearance_group' +
        '&$where=within_circle(incident_location, 47.593307, -122.3343541, 1609.34)&$group=event_clearance_group&$ORDER=count DESC',
        success: function(data){
            createBarChart(data);
        }

    });
}
/*
 * This is my first attempt to use d3, I haven't done much data visualization for web, but I figured I should
 * attempt to include a chart of some kind as well as a map, data table and a simple list.
 * This chart resizes for screen size on load but doesn't look good on smaller screens.
 *
 * http://bl.ocks.org/mbostock/1389927
*/

function createBarChart(temp) {
        var height = 900;

    var format = d3.format(",.0f");

    var x = d3.scale.linear().range([0,  chartWidth *.75]),
        y = d3.scale.ordinal().rangeRoundBands([0, height],.1);

    var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-height),
        yAxis = d3.svg.axis().scale(y).orient("left").tickSize(1);

    var svg = d3.select("#graphsDiv").append("svg")
        .attr("width", chartWidth)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + chartWidth *.25 + "," + 50 + ")");

        // Parse numbers, and sort by value.
        temp.forEach(function(crime) { crime.count = +crime.count; });
        temp.sort(function(crimeA, crimeB) { return crimeB.count - crimeA.count; });

        // Set the scale domain.
        x.domain([0, d3.max(temp, function (crime) {
            return crime.count +10000;
        })]);
        y.domain(temp.map(function (crime) {
            return crime.event_clearance_group;
        }));

    var bar = svg.selectAll("g.bar")
            .data(temp)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function (crime) {
                return "translate(25," + y(crime.event_clearance_group) + ")";
            });


        bar.append("rect")
            .attr("width", function (crime) {
                return x(crime.count);
            })
            .attr("height", y.rangeBand());

        bar.append("text")
            .attr("class", "count")
            .attr("x", function (crime) {
                return x(crime.count);
            })
            .attr("y", y.rangeBand() / 2)
            .attr("dx", -3)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(function (crime) {
                return format(crime.count);
            });

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

}