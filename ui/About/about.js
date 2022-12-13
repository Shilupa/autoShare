"use strict";
//const url = "http://localhost:3000"; // change url when uploading to server
const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

const btnLogin = document.querySelector("#btn-login");
const btnLogout = document.querySelector("#btn-logout");
const userHtml = document.querySelector("#user-html");

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
//checking token if it exists
/* if (token != null) {
  btnLogin.innerHTML = "Logout";
  btnLogin.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  });
} */

//new
if (token != null) {
  btnLogin.style.display = "none";
  btnLogout.style.display = "visible";
  userHtml.innerHTML = `Hi ${user.name}!`;

  userHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });
} else {
  btnLogout.style.display = "none";
}

btnLogout.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
});


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
