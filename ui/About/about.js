"use strict";
//const url = "http://localhost:3000"; // change url when uploading to server
const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

//normal view button
const btnLogin = document.querySelector("#btn-login");
const userHtml = document.querySelector("#user-html");
const btnLogout = document.querySelector("#btn-logout");

//hamburger-menu
const hamburgerBtnLogin = document.querySelector("#hamburger-login");
const hamburgerBtnLogout = document.querySelector("#hamburger-logout");
const hamburgerUserHtml = document.querySelector("#hamburger-user-html");

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
console.log("From home.js line 19", user, token);
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