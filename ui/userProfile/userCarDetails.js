"use strict";

const url = "http://localhost:3000";

console.log(sessionStorage.getItem("token"));
const user = JSON.parse(sessionStorage.getItem("user"));

const placeholder_1 = document.getElementById("file-input_1");
const formPH1 = document.querySelector("#placeholder1");

placeholder_1.onchange = () => {
  const selectedFile = placeholder_1.files[0];
  console.log(selectedFile);
  const fd = new FormData(formPH1);
  console.log(fd);
};

/* placeholder_1.addEventListener("file", async (evt) => {
  evt.preventDefault();
  const fd = new FormData(placeholder_1);
  console.log(fd);
}); */

// code of add car

//const carForm = document.getElementById("add-car");
/* 
placeholder_1.addEventListener("select", async (evt) => {
  evt.preventDefault();
  const fd = new FormData(placeholder_1);
  console.log(fd);
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
 */
