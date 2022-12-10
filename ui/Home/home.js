"use strict";

const url = "http://localhost:3000";

const ul = document.querySelector(".car-list-item");
const searchedList = document.querySelector("#searched-list");
const btnLogin = document.querySelector("#btn-login");
const search = document.querySelector("#search");
const notFound = document.querySelector("#not-found");
const sortCar = document.querySelectorAll(".sort");
const carName = document.querySelector(".brand");
const fuel = document.querySelector(".fuel-value");
const gearbox = document.querySelector(".gearbox-value");

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
  // Filter cars by category
  createCarCards(cars);
  //sortCars(cars);
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
        console.log("Cheap", carToSort);
      } else if (sort.innerHTML == "Most Expensive") {
        carToSort.sort((a, b) => b.rent_price - a.rent_price);
        console.log("Expensive", cars);
        sortedCars(carToSort);
      } else if (sort.innerHTML == "Popularity") {
        // TODO: Sorting car by popularity
        sortedCars(carToSort);
      }
    });
  });
};

const sortedCars = (cars) => {
  cars.forEach((car) => {
    const img = document.createElement("img");
    //console.log(car);
    //img.src = url + car.filename;
    img.src = "../../autoshare-logo/png/logo-white.png";
    img.alt = car.brand;
    img.height = 200;
    img.width = 200;
    img.classList.add("resp");

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

    li.addEventListener("click", () => {
      //location.href = "../carDetails/carDetails.html" + car.reg_no;
      if (token) {
        location.href = `../carDetails/carDetails.html?id=${car.reg_no}`;
      } else {
        location.href = "../login/login-1.html";
      }
    });
  });
};

// Filtering car list on user input
search.addEventListener("keyup", () => {
  let searchedCarList = [];
  let inputValue = search.value.toLowerCase();
  const carList = document.querySelectorAll("li.car-list");
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
      notFound.innerHTML = "Sorry Car Not Found!!";
    } else if (inputValue === "") {
      // if no input value restoring notFound value to it's default value
      notFound.innerHTML = "";
    } else {
      notFound.innerHTML = "";
    }
  });
});
