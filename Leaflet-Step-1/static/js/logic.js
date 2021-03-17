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
        return magnitude*800;
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

// Sending our earthquakes layer to the createMap function
// Coding below based closely off class excercise 17.1.10 again
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

// Define a baseMaps object to hold our base layers
var baseMaps = {
    "Street Map": streetmap,
};

// Add earthquake data as a layer
var overlayMaps = {
    Earthquakes: earthquakes
};
  
// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 3,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}