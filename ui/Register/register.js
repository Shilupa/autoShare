"use strict";
const url = "http://localhost:3000";

const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = serializeJson(registerForm);
  for (const [prop, value] of Object.entries(data)) {
    if (value === "") {
      delete data[prop];
    }
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
  console.log("registerFrom", json);
});

const register = async () => {
  try {
    const response = await fetch(url + "/car");
    const cars = await response.json();
    console.log(cars);
  } catch (e) {
    console.log(e.message);
  }
};
