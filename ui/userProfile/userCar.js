"use strict";
const url = "http://localhost:3000";

const ul = document.querySelector(".car-list");
const carName = document.querySelector(".brand");
const fuel = document.querySelector(".fuel");
const gearbox = document.querySelector(".gearbox");

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user, token);

if (token != null) {
  // Fetching car data from server
  (async () => {
    const response = await fetch(url + "/car/user/" + user.id);
    console.log(response);
    const cars = await response.json();
    // Filter cars by category
    console.log(cars);
    //createCarCards(cars);
    //sortCars(cars);
  })();
}
