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
    // Check attributes of USGS geoJSON
    console.log(data.features)
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
                return "#ff5533";
            case magnitude > 6:
                return "#ff7433";
            case magnitude > 5:
                return "#ff9933";
            default:
                return "#ffbb33";
        }
    }
    // Define a function that makes the size of the circles proportional to the earthquake magnitude
    function circleSize(magnitude) {
        return magnitude*100;
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Use pointtoLayer to create circle markers as shown in documentation here... https://leafletjs.com/examples/geojson/
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(earthquakeData, latlng) {
            return L.circle(latlng, {
                radius: circleSize(earthquakeData.properties.mag),
                color: ColorSelect(earthquakeData.properties.mag),
                fillOpacity: 0.8
      });
    },
    onEachFeature: onEachFeature
    });
    console.log(earthquakes)

// Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
  });

  // Add earthquake data as a layer
  
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
}

// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color.


// Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.


// Include popups that provide additional information about the earthquake when a marker is clicked.


// Create a legend that will provide context for your map data.
