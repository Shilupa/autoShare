"use strict";
const url = "http://localhost:3000"; // change url when uploading to server
//const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

const ul = document.querySelector(".car-list");
const carName = document.querySelector(".brand");
const fuel = document.querySelector(".fuel");
const gearbox = document.querySelector(".gearbox");

//selecting from normal view
const btnLogout = document.querySelector("#btn-logout");
const userHtml = document.querySelector("#user-html");

//selecting from hamburger
const hamburgerBtnLogout = document.querySelector("#hamburger-logout");
const hamburgerUserHtml = document.querySelector("#hamburger-user-html");

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user, token);

//checking token if it exists
if (token != null) {
  //normal page
  userHtml.innerHTML = `Hi ${user.name}!`;

  userHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });

  //hamburger
  hamburgerBtnLogout.style.display = "visible";
  hamburgerUserHtml.innerHTML = `Hi ${user.name}!`;

  hamburgerUserHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });

  // Fetching car data from server
  (async () => {
    const response = await fetch(url + "/car/user/" + user.id);
    console.log(response);
    const cars = await response.json();
    // Filter cars by category
    console.log(cars);

    cars.forEach((car) => {
      // console.log(car.reg_no);
      const img = document.createElement("img");
      if (car.file_name) {
        img.src = "../../server/thumbnails/" + car.file_name;
      } else {
        img.src = "../../autoshare-logo/png/logo-white.png";
      }
      img.alt = car.brand;

      const h4 = document.createElement("h4");
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
        '  <li class="seats"><i class="fa-solid fa-users"></i>&nbsp;' +
        `${car.seater}` +
        "</li>" +
        '<li class="fuel">' +
        '<i class="fa-solid fa-gas-pump">&nbsp;</i>' +
        `${car.fuel_type}` +
        " </li>" +
        '<li class="gearbox">' +
        '<i class="fa-solid fa-gears">&nbsp;</i>' +
        `${car.transmission}` +
        "</li>" +
        "</ul>" +
        "</div>";

      const detail = document.createElement("div");
      detail.innerHTML = details;

      const li = document.createElement("li");
      // Setting attribute for li to use for filtering
      li.setAttribute("class", "car-list-item");
      li.classList.add("light-border");

      li.appendChild(h4);
      li.appendChild(figure);
      li.appendChild(rating);
      li.appendChild(detail);

      // appending one card to the whole container
      ul.prepend(li);

      // Get inside the car
      li.addEventListener("click", () => {
        if (token) {
          location.href = `../userProfile/userCarDetails.html?id=${car.reg_no}`;
        } else {
          location.href = "../login/login-1.html";
        }
      });
    });
  })();
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
