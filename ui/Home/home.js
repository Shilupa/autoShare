"use strict";

const url = "http://localhost:3000";

const ul = document.querySelector(".car-list-item");
const searchedList = document.querySelector("#searched-list");
const btnLogin = document.querySelector("#btn-login");
const search = document.querySelector("#search");
const notFound = document.querySelector("#not-found");
const sortCar = document.querySelectorAll(".sort");

const token = sessionStorage.getItem("token");
const user = sessionStorage.getItem("user");
console.log(user, token);

//checking token if it exists
if (token != null) {
  btnLogin.innerHTML = "Logout";
  btnLogin.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  });
}
// Fetching car data from server
(async () => {
  const response = await fetch(url + "/car");
  const cars = await response.json();
  // createCarCards(cars);
  sortCars(cars);
})();

let test = document.querySelector(".sort");

/* //inserting element to the list in html page
const createCarCards = (cars) => {
  sortCar.forEach((sort) => {
    sort.addEventListener("click", (event) => {
      event.preventDefault();
      ul.innerHTML = "";
      if (sort.innerHTML == "The Cheapest") {
        cars.sort((a, b) => a.rent_price - b.rent_price);
        sortCars(cars);
        console.log("Cheap", cars);
      } else if (sort.innerHTML == "Most Expensive") {
        cars.sort((a, b) => b.rent_price - a.rent_price);
        console.log("Expensive", cars);
        sortCars(cars);
      } else if (sort.innerHTML == "Popularity") {
        // TODO: Sorting car by popularity
        console.log("Popular");
        sortCars(cars);
      }
    });
  });

  console.log(cars);
}; */

// Filtering car list on user input
search.addEventListener("keyup", () => {
  let inputValue = search.value.toLowerCase();
  const carList = document.querySelectorAll("li.car-list");
  carList.forEach((car) => {
    let brand = car.getElementsByTagName("h4")[0];
    if (!brand.innerHTML.toLocaleLowerCase().indexOf(inputValue)) {
      car.style.display = "";
    } else {
      car.style.display = "none";
    }
  });
});

const sortCars = (cars) => {
  console.log("Car");
  cars.forEach((car) => {
    const img = document.createElement("img");

    //img.src = url + car.filename;
    img.src = "../../autoshare-logo/png/logo-white.png";
    img.alt = car.brand;
    img.height = 200;
    img.width = 200;
    img.classList.add("resp");

    img.addEventListener("click", () => {
      location.href = "single.html?id=" + car.car_id;
    });

    const h4 = document.createElement("h4");
    // Setting attribute for brand to use for filtering
    h4.setAttribute("className", "brand");
    h4.innerHTML = car.brand;

    const figure = document.createElement("figure").appendChild(img);

    const p1 = document.createElement("p");
    p1.innerHTML = `${car.seater}`;

    const p2 = document.createElement("p");
    p2.innerHTML = `${car.fuel_type}`;

    const p3 = document.createElement("p");
    p3.innerHTML = `${car.transmission}`;

    const p4 = document.createElement("p");
    p4.innerHTML = `${car.rent_price}/hour`;

    const li = document.createElement("li");
    // Setting attribute for li to use for filtering
    li.setAttribute("class", "car-list");
    li.classList.add("light-border");

    li.appendChild(h4);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);
    ul.appendChild(li);
  });
};
