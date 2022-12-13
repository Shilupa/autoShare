"use strict";

const url = "http://localhost:3000"; // change url when uploading to server
//const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

const token = sessionStorage.getItem("token");
console.log(sessionStorage.getItem("token"));
const user = JSON.parse(sessionStorage.getItem("user"));

const carForm = document.getElementById("add-car");

//selecting from normal view
const btnLogout = document.querySelector("#btn-logout");
const userHtml = document.querySelector("#user-html");

//selecting from hamburger
const hamburgerBtnLogout = document.querySelector("#hamburger-logout");
const hamburgerUserHtml = document.querySelector("#hamburger-user-html");

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


carForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  //const fd = new FormData(carForm);
  const data = serializeJson(carForm);
  console.log(data);

  for (const [prop, value] of Object.entries(data)) {
    if (value === "") {
      delete data[prop];
    }
  }
  console.log(data);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  };
  console.log(fetchOptions);
  const response = await fetch(url + "/car/addcar/" + user.id, fetchOptions);
  const json = await response.json();
  if (json.status === 200) {
    alert(json.message);
    location.href = "userCar.html";
  }
});

