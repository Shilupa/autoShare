"use strict";
const url = "http://localhost:3000";

const profileForm = document.querySelector("#profile-form");
const userName = document.querySelector(".name");
const gender = document.querySelector(".gender");
const email = document.querySelector(".email");
const dob = document.querySelector(".dob");
const phone = document.querySelector(".phone");
const adddress = document.querySelector(".adddress");
const city = document.querySelector(".city");
const postalCode = document.querySelector(".postal_code");
const license = document.querySelector(".license");
const password = document.querySelector(".password");
const confrimPassword = document.querySelector(".confirm-password");
const btnLogout = document.querySelector("#btn-logout");
const userHtml = document.querySelector("#user-html");

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user);

if (token != null) {
  btnLogout.style.display = "visible";
  userHtml.style.display = "visible";
  userHtml.innerHTML = `Hi ${user.name}!`;

  btnLogout.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  });
} else {
  btnLogout.style.display = "none";
  userHtml.style.display = "none";
}

userName.value = user.name;
gender.value = user.gender;
email.value = user.email;
city.value = user.city;
// Cannot auto fill
//dob.value = user.dob
phone.value = user.phone_;
postalCode.value = user.postal_code;
license.value = user.license;
// Password not in user object
//password.value = user.password;
//confrimPassword.value = user.confrimPassword;
// Cannot assign
//adddress.value = user.street_address;

profileForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(profileForm);
  data.name = userName.value;
  data.gender = gender.value;
  data.email = email.value;
  data.phone_ = phone.value;
  data.city = city.value;
  data.postal_code = postalCode.value;
  data.license = license.value;

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${url}/profile/${user.id}`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
});
