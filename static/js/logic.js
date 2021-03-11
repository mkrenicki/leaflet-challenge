// Level 1: Basic Visualization

// Pick dataset from http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
// Chosen data set (JSON URL): https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
// Data set is for all earthquakes with magnitude over 4.5 in past week
// Assign link to variable
var equakeJSON = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.
// Perform a GET request to the query URL, code below sourced primarily from class excercise 17.1.10
d3.json(equakeJSON, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });
  
  function createFeatures(earthquakeData) {
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // Define a function for circle colors using magnitude
    function ColorSelect(magnitude) {
        switch (true) {
            case magnitude > 7:
                return "MediumBlue";
            case magnitude > 6:
                return "DeepSkyBlue";
            case magnitude > 5:
                return "LightSkyBlue";
            default:
                return "PowderBlue";
        }
    }
    // Define a function that makes the size of the circles proportional to the earthquake magnitude
    function circleSize(magnitude) {
        return magnitude*10;
    }


// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color.


// Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.


// Include popups that provide additional information about the earthquake when a marker is clicked.


// Create a legend that will provide context for your map data.


