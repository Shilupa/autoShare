"use strict";
//const url = "http://localhost:3000"; // change url when uploading to server
const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));

const carForm = document.getElementById("add-car");

//selecting from normal view
const btnLogout = document.querySelector("#btn-logout");
const userHtml = document.querySelector("#user-html");

//selecting from hamburger
const hamburgerBtnLogout = document.querySelector("#hamburger-logout");
const hamburgerUserHtml = document.querySelector("#hamburger-user-html");


//calendar and time
var today = new Date().toISOString().split('T')[0];
document.querySelector("#start-date").setAttribute('min', today);
document.querySelector("#end-date").setAttribute('min', today);

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

} else {
  location.href="../Home/home.html";
  btnLogout.style.display = "none";
  hamburgerBtnLogout.style.display = "none";
  hamburgerUserHtml.style.display = "none";
}

btnLogout.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  location.href="../Home/home.html";
});

hamburgerBtnLogout.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  location.href="../Home/home.html";
});


carForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(carForm);

  for (const [prop, value] of Object.entries(data)) {
    if (value === "") {
      delete data[prop];
    }
  }

  //making sure user cannot choose end time before start time
  const pickup_date = data.pickup_date;
  const dropoff_date =  data.dropoff_date;
  const pickup_time = data.pickup_time;
  const dropoff_time = data.dropoff_time;

  if(pickup_date>dropoff_date){
    alert("Drop off date cannot be before pick up date");
    return;
  } else if(pickup_date===dropoff_date && dropoff_time<pickup_time){
    alert("Drop off time cannot be before pick up time");
    return;
  }

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + "/car/addcar/" + user.id, fetchOptions);
  const json = await response.json();
  alert(json.message);
  if (json.status === 201) {
    location.href = "userCar.html";
  }else{}
});