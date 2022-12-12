"use strict";
//const url = "http://localhost:3000"; // change url when uploading to server
const url = "suraj-bcwt.northeurope.cloudapp.azure.com/app";

const btnLogin = document.querySelector("#btn-login");

const token = sessionStorage.getItem("token");
//checking token if it exists
if (token != null) {
  btnLogin.innerHTML = "Logout";
  btnLogin.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  });
}
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
