"use strict";

const url = "http://localhost:3000";

const ul = document.querySelector("#list");
const btnLogin = document.querySelector("#btn-login");
const token = sessionStorage.getItem("token");
const user = sessionStorage.getItem("user");
console.log(user, token);

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
  const json = await response.json();
  createCarCards(json);
})();

ul.innerHTML = "";

const createCarCards = (cars) => {
  console.log(cars);

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
