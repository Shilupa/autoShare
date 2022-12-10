"use strict";
const url = "http://localhost:3000";

const carCard = document.querySelector(".card");
const fuel = document.querySelector(".fuel-value");
const gearbox = document.querySelector(".gearbox-value");
const year = document.querySelector(".year-value");
const numberOfPeople =  document.querySelector(".number-of-people-value");
const rentPrice = document.querySelector(".rent-price-value");

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const reg_no = getQParam("id");

console.log(reg_no);
//const img = document.querySelector('#image img') */

// add existing car data to form
const getCar = async (reg_no) => {
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const response = await fetch(url + "/car/" + reg_no, fetchOptions);
  const car = await response.json();
  console.log(car);
  //img.src = `${url}/${car.filename}`;
  //addMarker(JSON.parse(car.coords));

  createCarCard(car);
};
const createCarCard = (car) => {
  const h3 = document.createElement("h3");
  // Setting attribute for brand to use for filtering
  h3.setAttribute("className", "brand");
  h3.innerHTML = car.brand;

  //const figure = document.createElement("figure").appendChild(img);

  fuel.innerHTML = car.fuel_type;
  gearbox.innerHTML = car.transmission;
  year.innerHTML = car.year_;
  numberOfPeople.innerHTML = car.seater;
  rentPrice.innerHTML = car.rent_price;

};
getCar(reg_no);
