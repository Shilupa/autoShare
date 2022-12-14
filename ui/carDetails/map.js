"use strict";
const initMap = () => {
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 40.731, lng: -73.997 },
  });

  geocoder.geocode({ address: "Maininkitie" }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      const latitude = results[0].geometry.location.lat();
      const longitude = results[0].geometry.location.lng();

      document.getElementById("submit").addEventListener("click", () => {
        geocodeLatLng(geocoder, map, infowindow, latitude, longitude);
      });
    }
  });
};

const geocodeLatLng = (geocoder, map, infowindow, latitude, longitude) => {
  /*   const input = document.getElementById("latlng").value;
  const latlngStr = input.split(",", 2); */
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
