"use strict";
const url = "http://localhost:3000";

const carCard = document.querySelector(".card");
const carName = document.querySelector(".car-name");
const fuel = document.querySelector(".fuel-value");
const gearbox = document.querySelector(".gearbox-value");
const year = document.querySelector(".year-value");
const startDate = document.querySelector(".start-value");
const startTime = document.querySelector(".start-time-value");
const endDate = document.querySelector(".end-value");
const endTime = document.querySelector(".end-time-value");
const numberOfPeople = document.querySelector(".number-of-people-value");
const rentPrice = document.querySelector(".rent-price-value");
const btnLogin = document.querySelector("#btn-login");

const user = document.querySelector(".user-value");
const phone = document.querySelector(".phone-value");
const email = document.querySelector(".email-value");
const address = document.querySelector(".address-value");

const token = sessionStorage.getItem("token");
//checking token if it exists
if (token != null) {
  btnLogin.innerHTML = "Logout";
  btnLogin.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  });
}
// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const reg_no = getQParam("id");
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

const createCarCard = async (car) => {
  const h3 = document.createElement("h3");
  // Setting attribute for brand to use for filtering
  h3.setAttribute("className", "brand");
  h3.innerHTML = car.brand;

  const img = document.createElement('img');
    img.src = url + '/thumbnails/' + car.filename;
    img.alt = car.brand;
    img.classList.add('resp');


  //const figure = document.createElement("figure").appendChild(img);
  carName.innerHTML = car.brand;
  fuel.innerHTML = car.fuel_type;
  gearbox.innerHTML = car.transmission;
  year.innerHTML = car.year_;
  numberOfPeople.innerHTML = car.seater;
  rentPrice.innerHTML = car.rent_price;

  // Splitting date string to remove unnecessary string
  const splittedStartDate = car.pickup_date.split("T");
  const splittedEndDate = car.dropoff_date.split("T");

  startDate.innerHTML = splittedStartDate[0];
  startTime.innerHTML = car.pickup_time;
  endDate.innerHTML = splittedEndDate[0];
  endTime.innerHTML = car.dropoff_time;
  const person = await getUser(car.person_id);
  user.innerHTML = person.name;
  phone.innerHTML = person.phone_;
  email.innerHTML = person.email;
  address.innerHTML = person.street_address;
};
const getUser = async (person_id) => {
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const response = await fetch(url + "/user/" + person_id, fetchOptions);
  return await response.json();
};

getCar(reg_no);
