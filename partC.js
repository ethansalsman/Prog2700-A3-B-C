// IIFE
(() => {

    //create map in leaflet and tie it to the div called 'theMap'

    let map = L.map('theMap').setView([42, -60], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    L.marker([42, -60]).addTo(map)
        .bindPopup('This is a sample popup. You can put any html structure in this including extra flight data. You can also swap this icon out for a custom icon. Some png files have been provided for you to use if you wish.')
        .openPopup();

    //create a custom icon
    let myIcon = L.icon({
        iconUrl: 'images/plane4-45.png',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
    });

    // fetch flight data from OpenSky Network API and filter by country code "CA" for Canada
    fetch('https://opensky-network.org/api/states/all')
        .then(response => response.json())
        .then(data => {
            let canadianAircraft = data.states.filter(aircraft => aircraft[2] === "CA");
            console.log(canadianAircraft);
        })
        .catch(error => console.error(error));

        // display the canadian aircraft on the map in the partC.html file
        // use the custom icon created above
    // fetch flight data from OpenSky Network API and filter by country code "CA" for Canada


    // transform the canadianAircraft data into GeoJSON format
    let features = canadianAircraft.map(aircraft => {
        // gather the data from the aircraft array
        let lat = aircraft[6];
        let lon = aircraft[5];
        let altitude = aircraft[7];
        let callsign = aircraft[1];
        // return the GeoJSON feature
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                // convert the coordinates to GeoJSON format: [longitude, latitude]
                coordinates: [lon, lat]
            },
            properties: {
                // include the altitude and callsign as properties
                altitude: altitude,
                callsign: callsign
            }
        };
    });
    // create a GeoJSON feature collection
    let geoJson = {
        type: 'FeatureCollection',
        features: features
    };
    // log the GeoJSON feature collection
    console.log(geoJson);

    // add the GeoJSON feature collection to the map
    L.geoJSON(geoJson).addTo(map);
    
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // add the new markers to the map
    function fetchAircraftData() {
        fetch('https://opensky-network.org/api/states/all')
        .then(response => response.json())
        .then(data => {
            let canadianAircraft = data.states.filter(aircraft => aircraft[2] === "CA");
            console.log(canadianAircraft);

            // transform the canadianAircraft data into GeoJSON format
            let features = canadianAircraft.map(aircraft => {
                // gather the data from the aircraft array
                let lat = aircraft[6];
                let lon = aircraft[5];
                let altitude = aircraft[7];
                let callsign = aircraft[1];
                // return the GeoJSON feature
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        // convert the coordinates to GeoJSON format: [longitude, latitude]
                        coordinates: [lon, lat]
                    },
                    properties: {
                        // include the altitude and callsign as properties
                        altitude: altitude,
                        callsign: callsign
                    }
                };
            });
            // create a GeoJSON feature collection
            let geoJson = {
                type: 'FeatureCollection',
                features: features
            };
            // log the GeoJSON feature collection
            console.log(geoJson);

            // remove existing markers from the map
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // add the new markers to the map
            L.geoJSON(geoJson, {
                pointToLayer: function(feature, latlng) {
                    return L.marker(latlng, {icon: myIcon});
                },
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(`Altitude: ${feature.properties.altitude} ft<br>Callsign: ${feature.properties.callsign}`);
                }
            }).addTo(map);
        })
        .catch(error => console.error(error));
    }

    // fetch the aircraft data initially
    fetchAircraftData();

    // fetch the aircraft data every 5 minutes and update the map
    setInterval(fetchAircraftData, 5 * 60 * 1000);  

})();   // end IIFE
