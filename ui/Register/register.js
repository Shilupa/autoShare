"use strict";
//const url = "http://localhost:3000"; // change url when uploading to server
const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

const registerForm = document.getElementById("register-form");
const errorMessage = document.getElementById("error-message");

//setting dob calendar to max today
var today = new Date().toISOString().split('T')[0];
document.querySelector(".dob").setAttribute('max', today);

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = serializeJson(registerForm);
  for (const [prop, value] of Object.entries(data)) {
    if (value === "") {
      delete data[prop];
    }
  }

  // Give error message confirm password does not match password
  if (data.password !== data.confirmPassword) {
    alert("Password did not match!");
    return;
  }
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
  const response = await fetch(url + "/auth/register", fetchOptions);
  const json = await response.json();
  alert(json.message);
  //navigation to login page.
  if (json.status === 201) {
    location.href = "../Login/login-1.html";
  }
});
