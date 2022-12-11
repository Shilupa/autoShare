"use strict";
const url = "http://localhost:3000";
console.log(sessionStorage.getItem("token"));

const carForm = document.getElementById("add-car");

carForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const fd = new FormData(carForm);
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
  const response = await fetch(url + "/car", fetchOptions);
  const json = await response.json();
  alert(json.message);
});
