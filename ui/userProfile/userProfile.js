"use strict";
//const url = "http://localhost:3000"; // change url when uploading to server
const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

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
const profileImage = document.querySelector("#profile-image");
const deleteBtn = document.querySelector("#delete-button");

console.log("cookie:" + document.cookie);

// place holder for profile
const profile_pic_form = document.getElementById("upload");
const profile_pic_img = document.getElementById("profile-image");
const formPH1 = document.querySelector("#profile_pic_form");

//selecting from normal view
const btnLogout = document.querySelector("#btn-logout");
const userHtml = document.querySelector("#user-html");

//selecting from hamburger
const hamburgerBtnLogout = document.querySelector("#hamburger-logout");
const hamburgerUserHtml = document.querySelector("#hamburger-user-html");

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
//console.log(user);

//calendar and time
var today = new Date().toISOString().split("T")[0];
document.querySelector(".dob").setAttribute("max", today);

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

//checking token if it exists
if (token != null) {
  //normal page
  userHtml.innerHTML = `Hi ${user.name}!`;
  userHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });

  //hamburger
  hamburgerBtnLogout.style.display = "visible";
  hamburgerUserHtml.innerHTML = `Hi ${user.name}!`;
  hamburgerUserHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });
} else {
  location.href = "../Home/home.html";
  btnLogout.style.display = "none";
  hamburgerBtnLogout.style.display = "none";
  hamburgerUserHtml.style.display = "none";
}

btnLogout.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
});

hamburgerBtnLogout.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
});

userName.value = user.name;
gender.value = user.gender;
const date = user.dob.split("T");
dob.value = date[0];
phone.value = user.phone_;
address.value = user.street_address;
city.value = user.city;
postalCode.value = user.postal_code_;
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

deleteBtn.addEventListener("click", async () => {
  console.log("hello", user.id);
  const fetchOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(`${url}/user/${user.id}`, fetchOptions);
  const json = await response.json();
  if (json.status === 200) {
    alert(json.message);
    location.href = "../login/login-1.html";
  } else {
    alert("Something went wrong!!");
  }
});
