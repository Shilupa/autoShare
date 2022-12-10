"use strict";
const url = "http://localhost:3000";

const addForm = document.querySelector("#addCatForm");

// submit add car form
addForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: fd,
  };
  const response = await fetch(url + "/car", fetchOptions);
  const json = await response.json();
  alert(json.message);
});

const createCarCards = (cars) => {
  // clear ul
  ul.innerHTML = "";
  cars.forEach((car) => {
    // create li with DOM methods
    const img = document.createElement("img");
    img.src = url + "/thumbnails/" + car.filename;
    img.alt = car.name;
    img.classList.add("resp");

    // open image in single.html
    img.addEventListener("click", () => {
      location.href = "single.html?id=" + car.car_id;
    });
  });
};
