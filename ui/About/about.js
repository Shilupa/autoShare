"use strict";
const url = "http://localhost:3000"; // change url when uploading to server

// Self invoking fuction which gets list of cars from database
(async () => {
  try {
    const response = await fetch(url + "/car");
    const cars = await response.json();
    console.log(cars);
  } catch (e) {
    console.log(e.message);
  }
})();
