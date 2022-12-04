"use strict";
const url = "http://localhost:3000";

const registerForm = document.getElementById("register-form");
console.log(registerForm);
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = serializeJson(registerForm);
  for (const [prop, value] of Object.entries(data)) {
    if (value === "") {
      delete data[prop];
    }
  }

  console.log(data);
});
