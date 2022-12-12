"use strict";
const url = "http://localhost:3000";

const profileForm = document.querySelector("#profile-form");
const userName = document.querySelector(".name");
const gender = document.querySelector(".gender");
//const email = document.querySelector(".email");
const dob = document.querySelector(".dob");
const phone = document.querySelector(".phone");
const address = document.querySelector(".address");
const city = document.querySelector(".city");
const postalCode = document.querySelector(".postal_code");
const license = document.querySelector(".license");
const password = document.querySelector(".password");
const confrimPassword = document.querySelector(".confirm-password");
const btnLogout = document.querySelector("#btn-logout");
const userHtml = document.querySelector("#user-html");
const profileImage = document.querySelector("#profile-image");

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user);

(async () => {
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(`${url}/profile/${user.id}`, fetchOptions);
  const profile = await response.json();

  profileImage.src = `${url}/thumbnails/${profile.file}`;
  console.log(profile);
})();

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
//email.value = user.email;
city.value = user.city;
phone.value = user.phone_;
postalCode.value = user.postal_code;
license.value = user.license;
const date = user.dob.split("T");
console.log(date);
dob.value = date[0];
address.value = user.street_address;

profileForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const fd = new FormData(profileForm);
  const data = serializeJson(profileForm);
  data.name = userName.value;
  data.gender = gender.value;
  /* data.email = email.value; */
  data.phone_ = phone.value;
  data.city = city.value;
  data.postal_code = postalCode.value;
  data.license = license.value;

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

  console.log("Bibek bro log: ", data);

  const fetchOptions = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: fd,
  };
  const response = await fetch(`${url}/profile/${user.id}`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
});
