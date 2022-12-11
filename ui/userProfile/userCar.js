'use strict'
const url = "http://localhost:3000";

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user, token);

//checking token if it exists
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

 // Fetching car data from server
(async () => {
   const response = await fetch(url + "/car/userId");
   const cars = await response.json();
   // Filter cars by category
   createCarCards(cars);
   //sortCars(cars);
 })();