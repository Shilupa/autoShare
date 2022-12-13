"use strict";
const url = "http://localhost:3000"; // change url when uploading to server
//const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

const profileForm = document.querySelector("#profile-form");
const userName = document.querySelector(".name");
const gender = document.querySelector(".gender");
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

// place holder for profile
const profile_pic_form = document.getElementById("upload");
const profile_pic_img = document.getElementById("profile-image");
const formPH1 = document.querySelector("#profile_pic_form");

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
//console.log(user);

(async () => {
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(`${url}/profile/${user.id}`, fetchOptions);
  const profile = await response.json();

  profileImage.src = `${url}/thumbnails/${profile.file}`;
  //console.log(profile);
})();

if (token != null) {
  btnLogout.style.display = "visible";
  userHtml.style.display = "visible";
  userHtml.innerHTML = `Hi ${user.name}!`;
  userHtml.style.color = "#006400";

  userHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });

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
const date = user.dob.split("T");
dob.value = date[0];
phone.value = user.phone_;
address.value = user.street_address;
city.value = user.city;
postalCode.value = user.postal_code;
license.value = user.license;

profileForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(profileForm);

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

  console.log(data);

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  console.log(fetchOptions);

  const response = await fetch(`${url}/user/${user.id}`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
    location.href = "../Login/login-1.html";
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
});

// New code

profile_pic_form.onchange = async () => {
  const selectedFile = profile_pic_form.files[0];
  //console.log(selectedFile);
  const fd = new FormData(formPH1);

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
  }
};
