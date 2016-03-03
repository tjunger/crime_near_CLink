# crime_near_CLink
Crime Data Website Code

Tim Unger

Data visualization of crime incidents within a 1 mile of CenturyLink Field in Seattle, WA. Data is sourced https://data.seattle.gov/resource/3k2p-39jp.json. Website consists of 4 tabs; Map, Statistics, Graph, Datatable. Each tab has all its logic its own .js file that is located in the js folder. CSS styling is from Bootstrap and a site specific css file in the css folder. All html is located in index.html. Unit tests are in the js/tests folder, using Karma/Jasmine. Tests are trivial because I am new to the idea of unit testing JavaScript but felt I needed to show that at minimum I could set up a testing suite and build/run a test.

Frameworks and Libraries Used: Bootstrap, Google Maps API, d3.js, google fonts.

Map tab shows 1000 incidents at a time. Update Map clears the map and gets 1000 new records offset in the dataset by the value of the slider. This roughly gives the user a sense of crime location changes over time. Had planned on using the timestamp on the records but failed to get the SoQL url query to work. 

Stats tab is a simple list of crimes by classification and count, sorted by count. This gives an easy-to-read, simple overview of the entire data set. Also was a way of testing more of the Socrata Query Language functionality using the count() function, the group by feature and the order option.

Graph tab uses d3 to create a bar chart that visualizes the dataset from the stats tab. Chart uses a percentage of the window.innerWidth property to size the chart to fit in whatever screen it is loaded on. This means the chart is viewable on a phone screen, but the labels are somewhat unreadable. Used http://bl.ocks.org/mbostock/1389927 as a basic template for my chart.

Datatable tab dynamically creates a datatable of 2000 records. Dataset offset can be changed in the .js file by updating the start offset and finish offset. Data sets larger than 2000 records rapidly decrease performance. 



