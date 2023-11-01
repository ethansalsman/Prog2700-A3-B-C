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
        // use the rotation angle and origin to rotate the icon based on the heading of the aircraft
        


        
        
})()