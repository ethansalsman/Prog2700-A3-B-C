// IIFE
(() => {

    //create map in leaflet and tie it to the div called 'theMap'

    let map = L.map('theMap').setView([42, -60], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // change the marker icon to plane4-45.png
    const myIcon = L.icon({
        iconUrl: 'plane4-45.png',
        iconSize: [38, 38],       
    });

    // create a GeoJSON feature collection
    const geoJson = {
        type: 'FeatureCollection',
        features: features
    };
    // log the GeoJSON feature collection
    console.log(geoJson);

    
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
            
           
            // log the GeoJSON features collection
            console.log(geoJson);

            // add the GeoJSON features collection to the map
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

        

    
    // close the IIFE   
}
)();
