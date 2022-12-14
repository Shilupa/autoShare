"use strict";
const mapAddress = document.querySelector("#latlng");

// Initializing google map

// Map address
const map_address_2 = document.querySelector("#latlng");

const initMap = () => {
  console.log("Map address: ", map_address_2.value);
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();

  // Fetching car data to get car address
  (async () => {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/car/" + reg_no, fetchOptions);
    const car = await response.json();
    // Setting car address to input value in html page
    mapAddress.value = car.car_address;

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: { lat: 61.9241, lng: 25.7482 },
    });

    // Generating lat and long values from address as string
    geocoder.geocode({ address: car.car_address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();
        // Displaying address in map on click
        document.getElementById("submit").addEventListener("click", () => {
          geocodeLatLng(geocoder, map, infowindow, latitude, longitude);
        });
      }
    });
  })();
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

        // Creating instance of marker
        const marker = new google.maps.Marker({
          position: latlng,
          map: map,
        });
        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
};

window.initMap = initMap;
