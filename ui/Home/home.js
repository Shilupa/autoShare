"use strict";

//const url = "http://localhost:3000"; // change url when uploading to server
const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

const ul = document.querySelector(".car-list");
const searchedList = document.querySelector("#searched-list");
const btnLogin = document.querySelector("#btn-login");
const btnLogout = document.querySelector("#btn-logout");
const userHtml = document.querySelector("#user-html");
const hamburgerBtnLogin = document.querySelector("#hamburger-login");
const hamburgerBtnLogout = document.querySelector("#hamburger-logout");
const hamburgerUserHtml = document.querySelector("#hamburger-user-html");
const search = document.querySelector("#search");
const notFound = document.querySelector("#number-of-cars");
const sortCar = document.querySelectorAll(".sort");
const carName = document.querySelector(".brand");
const fuel = document.querySelector(".fuel-value");
const gearbox = document.querySelector(".gearbox-value");

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));

//checking token if it exists
if (token != null) {
  btnLogin.style.display = "none";
  btnLogout.style.display = "visible";
  userHtml.innerHTML = `Hi ${user.name}!`;
  userHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });

  //hamburger
  hamburgerBtnLogin.style.display = "none";
  hamburgerBtnLogout.style.display = "visible";
  hamburgerUserHtml.innerHTML = `Hi ${user.name}!`;

  hamburgerUserHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });
} else {
  btnLogout.style.display = "none";
  hamburgerBtnLogout.style.display = "none";
  hamburgerUserHtml.style.display = "none";
}

//normal logout button
btnLogout.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  location.href = "../Home/home.html";
});

//hamburger logout button
hamburgerBtnLogout.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  location.href = "../Home/home.html";
});

// Fetching car data from server
(async () => {
  const response = await fetch(url + "/car");
  const cars = await response.json();
  // Filter cars by category
  createCarCards(cars);
})();

//inserting element to the list in html page
const createCarCards = (cars) => {
  // Copying array of cars to sort later
  let carToSort = [...cars];
  sortedCars(cars);

  sortCar.forEach((sort) => {
    sort.addEventListener("click", (event) => {
      event.preventDefault();
      ul.innerHTML = "";

      if (sort.innerHTML == "Show All") {
        sortedCars(cars);
      } else if (sort.innerHTML == "The Cheapest") {
        carToSort.sort((a, b) => a.rent_price - b.rent_price);
        sortedCars(carToSort);
      } else if (sort.innerHTML == "Most Expensive") {
        carToSort.sort((a, b) => b.rent_price - a.rent_price);
        sortedCars(carToSort);
      } else if (sort.innerHTML == "Avg. Rating") {
        carToSort.sort((a, b) => b.average_rating - a.average_rating);
        sortedCars(carToSort);
      }
    });
  });
};

const sortedCars = (cars) => {
  cars.forEach((car) => {
    const img = document.createElement("img");
    img.src = `${url}/thumbnails/` + car.file_name;
    img.alt = car.brand;
    img.classList.add("resp");

    const h4 = document.createElement("h4");
    // Setting attribute for brand to use for filtering
    h4.setAttribute("className", "brand");
    h4.innerHTML = car.brand;

    const figure = document.createElement("figure").appendChild(img);

    const rating = document.createElement("div");
    rating.setAttribute("class", "overall-ratings");
    for (let i = 1; i < 6; i++) {
      if (i <= Math.round(car.average_rating)) {
        const text = '<span class="fa fa-star checked"></span>';
        const span = document.createElement("span");
        span.innerHTML = text;
        rating.appendChild(span);
      } else {
        const text = '<span class="fa fa-star"></span>';
        const span = document.createElement("span");
        span.innerHTML = text;
        rating.appendChild(span);
      }
    }

    const details =
      '<div class="details">' +
      "<ul>" +
      '<li class="seats">' +
      '<i class="fa-solid fa-users"></i>&nbsp;<span' +
      '  class="seat-value"' +
      " >" +
      `${car.seater}` +
      "</span>" +
      "</li>" +
      '<li class="fuel">' +
      '<i class="fa-solid fa-gas-pump"' +
      '  ></i>&nbsp;<span class="fuel-value">' +
      `${car.fuel_type}` +
      "</span>" +
      "</li>" +
      '<li class="gearbox">' +
      '<i class="fa-solid fa-gears"' +
      '  ></i>&nbsp;<span class="gear-value">' +
      `${car.transmission}` +
      "</span>" +
      "</li>" +
      "</ul>" +
      "</div>";

    const detail = document.createElement("div");
    detail.innerHTML = details;

    const price = document.createElement("div");
    const price_text =
      '<div class="price">' +
      '<span class="price-value">' +
      `${car.rent_price}` +
      "</span>" +
      '<i class="fa-solid fa-euro-sign"></i> /hour' +
      "</div>";
    price.innerHTML = price_text;
    price.setAttribute("class", "price-and-rent");

    const li = document.createElement("li");
    // Setting attribute for li to use for filtering
    li.setAttribute("class", "car-list-item");
    li.classList.add("light-border");

    li.appendChild(h4);
    li.appendChild(figure);
    li.appendChild(rating);
    li.appendChild(detail);
    li.appendChild(price);

    // appending one card to the whole container
    ul.appendChild(li);

    li.addEventListener("click", () => {
      if (token) {
        location.href = `../carDetails/carDetails.html?id=${car.reg_no}`;
      } else {
        location.href = "../Login/login-1.html";
      }
    });
  });
};

// Filtering car list on user input
search.addEventListener("keyup", () => {
  let searchedCarList = [];
  let inputValue = search.value.toLowerCase();
  const carList = document.querySelectorAll(".car-list-item");
  carList.forEach((car) => {
    let brand = car.getElementsByTagName("h4")[0];
    // Searching if brand includes user input value
    if (brand.innerHTML.toLocaleLowerCase().includes(inputValue)) {
      // Storing  boolean values (True) to array if searched car found
      searchedCarList.push(
        brand.innerHTML.toLocaleLowerCase().includes(inputValue)
      );
      car.style.display = "";
    } else if (!brand.innerHTML.toLocaleLowerCase().includes(inputValue)) {
      // Storing  boolean values (False) to array if searched car not found
      searchedCarList.push(
        brand.innerHTML.toLocaleLowerCase().includes(inputValue)
      );
      car.style.display = "none";
    }

    /**
     * If searchedCarList have all values false and is equal to lenght of original car list
     * car not found is displayed to user
     */
    if (
      !searchedCarList.includes(true) &&
      searchedCarList.length === carList.length
    ) {
      notFound.innerHTML = "No cars found";
    } else if (inputValue === "") {
      // if no input value restoring notFound value to it's default value
      notFound.innerHTML = "";
    } else {
      notFound.innerHTML = "";
    }
  });
});
