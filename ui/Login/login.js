"use strict";
const url = "http://localhost:3000";

const loginForm = document.getElementById("login-form");
console.log(loginForm);
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = serializeJson(loginForm);
  for (const [prop, value] of Object.entries(data)) {
    if (value === "") {
      delete data[prop];
    }
  }

  console.log(data);
});
