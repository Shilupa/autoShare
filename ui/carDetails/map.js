"use strict";
// Initializing google map

// Map address
const map_address_2 = document.querySelector("#latlng");

const initMap = () => {
  console.log("Map address: ", map_address_2.value);
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 61.9241, lng: 25.7482 },
  });

  // Generating lat and long values from address as string
  geocoder.geocode({ address: "Maininkitie" }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      const latitude = results[0].geometry.location.lat();
      const longitude = results[0].geometry.location.lng();

      // Displaying address in map on click
      document.getElementById("submit").addEventListener("click", () => {
        geocodeLatLng(geocoder, map, infowindow, latitude, longitude);
      });
    }
  });
};

// Displaying address in map on click
const geocodeLatLng = (geocoder, map, infowindow, latitude, longitude) => {
  const latlng = {
    lat: latitude,
    lng: longitude,
  };

  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        map.setZoom(11);

        const marker = new google.maps.Marker({
          position: latlng,
          map: map,
        });
        console.log(response.results[0]);
        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
};

window.initMap = initMap;
