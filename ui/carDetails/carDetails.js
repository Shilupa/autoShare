"use strict";
const url = "http://localhost:3000"; // change url when uploading to server
//const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

//selecting from normal view
const btnLogout = document.querySelector("#btn-logout");
const userHtml = document.querySelector("#user-html");

//selecting from hamburger
const hamburgerBtnLogout = document.querySelector("#hamburger-logout");
const hamburgerUserHtml = document.querySelector("#hamburger-user-html");

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
const user = document.querySelector(".user-value");
const phone = document.querySelector(".phone-value");
const email = document.querySelector(".email-value");
const address = document.querySelector(".address-value");
const htmlImage = document.querySelector(".images");
const swipeLeft = document.querySelector("#left");
const swipeRight = document.querySelector("#right");

const token = sessionStorage.getItem("token");
const tokenUser = JSON.parse(sessionStorage.getItem("user"));
//console.log(tokenUser, token);

//checking token if it exists
if (token != null) {
  //normal page
  userHtml.innerHTML = `Hi ${tokenUser.name}!`;

  userHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });

  //hamburger
  hamburgerBtnLogout.style.display = "visible";
  hamburgerUserHtml.innerHTML = `Hi ${tokenUser.name}!`;

  hamburgerUserHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });
} else {
  btnLogout.style.display = "none";
  hamburgerBtnLogout.style.display = "none";
  hamburgerUserHtml.style.display = "none";
}

btnLogout.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
});

hamburgerBtnLogout.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
});

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
  console.log("details", car);
  //img.src = `${url}/${car.filename}`;
  //addMarker(JSON.parse(car.coords));

  createCarCard(car);
};

const createCarCard = async (car) => {
  const h3 = document.createElement("h3");
  // Setting attribute for brand to use for filtering
  h3.setAttribute("className", "brand");
  h3.innerHTML = car.brand;
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

  // Fetching person data
  const personUrl = `${url}/user/${car.person_id}`;
  const person = await getData(personUrl);

  user.innerHTML = person.name;
  phone.innerHTML = person.phone_;
  email.innerHTML = person.email;
  address.innerHTML = person.street_address;

  // Fetching car images
  const carUrl = `${url}/pictures/${car.reg_no}`;
  const carImages = await getData(carUrl);
  console.log(carImages.length);

  carImages.forEach((image) => {
    console.log(image.file_name);
    const details =
      '<div class="details">' +
      // hardcoded image file to be replaced with image.file_name
      `<img src="${url}/thumbnails/9f485ee5215ccb772bde1048b6f13f06"  alt=""  class="car-img"/>` +
      `<p> ${image.file_name} </p>` +
      "</div>";
    const detail = document.createElement("div");
    detail.innerHTML = details;
    htmlImage.append(detail);
  });

  const bookingUrl = `${url}/booking/${car.reg_no}`;
  const booking = await getData(bookingUrl);
  console.log("booking id", booking.id);
};

// Fetching user data or car images from respective databases
const getData = async (url) => {
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const response = await fetch(url, fetchOptions);
  return await response.json();
};

getCar(reg_no);
