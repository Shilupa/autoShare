"use strict";

//const url = "http://localhost:3000"; // change url when uploading to server
const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

const token = sessionStorage.getItem("token");

const user = JSON.parse(sessionStorage.getItem("user"));

// placeholder for pictueres
const placeholder_1 = document.getElementById("file-input_1");
const placeholder_1_img = document.getElementById("PH_1_image");
const formPH1 = document.querySelector("#placeholder1");

const placeholder_2 = document.getElementById("file-input_2");
const placeholder_2_img = document.getElementById("PH_2_image");
const formPH2 = document.querySelector("#placeholder2");

const placeholder_3 = document.getElementById("file-input_3");
const placeholder_3_img = document.getElementById("PH_3_image");
const formPH3 = document.querySelector("#placeholder3");

const placeholder_4 = document.getElementById("file-input_4");
const placeholder_4_img = document.getElementById("PH_4_image");
const formPH4 = document.querySelector("#placeholder4");

const placeholder_5 = document.getElementById("file-input_5");
const placeholder_5_img = document.getElementById("PH_5_image");
const formPH5 = document.querySelector("#placeholder5");

// delete pictures
const delete_PH1 = document.querySelector("#delete_PH1");
const delete_PH2 = document.querySelector("#delete_PH2");
const delete_PH3 = document.querySelector("#delete_PH3");
const delete_PH4 = document.querySelector("#delete_PH4");
const delete_PH5 = document.querySelector("#delete_PH5");

// foam data selector
const reg_no_text = document.querySelector(".reg_no");
const brand_text = document.querySelector(".brand");
const model_text = document.querySelector(".model");
const car_address_text = document.querySelector(".car_address");
const color_text = document.querySelector(".color");
const year_text = document.querySelector(".year_");
const fuel_type_text = document.querySelector(".fuel_type");
const transmission_text = document.querySelector(".transmission");
const seater_text = document.querySelector(".seater");
const rent_price_text = document.querySelector(".rent_price");
const pickup_date_text = document.querySelector(".pickup_date");
const pickup_time_text = document.querySelector(".pickup_time");
const dropoff_date_text = document.querySelector(".dropoff_date");
const dropoff_time_text = document.querySelector(".dropoff_time");
const form = document.querySelector("#add-car");

//const container = document.querySelector('.image-container');

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const reg_no = getQParam("id");

const getCarPics = async (reg_no) => {
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const response = await fetch(url + "/pictures/" + reg_no, fetchOptions);
  const pics = await response.json();
  console.log(pics.length);

  for (let i = 0; i < pics.length; i++) {
    if (pics[i].placeholder === 1) {
      placeholder_1_img.src = `${url}/thumbnails/${pics[i].file_name}`;
      delete_PH1.style.display = "block";
      formPH1.style.border = "none";
    }
    if (pics[i].placeholder == 2) {
      placeholder_2_img.src = `${url}/thumbnails/${pics[i].file_name}`;
      delete_PH2.style.display = "block";
      formPH2.style.border = "none";
    }
    if (pics[i].placeholder == 3) {
      placeholder_3_img.src = `${url}/thumbnails/${pics[i].file_name}`;
      delete_PH3.style.display = "block";
      formPH3.style.border = "none";
    }
    if (pics[i].placeholder == 4) {
      placeholder_4_img.src = `${url}/thumbnails/${pics[i].file_name}`;
      delete_PH4.style.display = "block";
      formPH4.style.border = "none";
    }
    if (pics[i].placeholder == 5) {
      placeholder_5_img.src = `${url}/thumbnails/${pics[i].file_name}`;
      delete_PH5.style.display = "block";
      formPH5.style.border = "none";
    }
  }
};

getCarPics(reg_no);

// add existing car data to form
const getCar = async (reg_no) => {
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const response = await fetch(url + "/car/" + reg_no, fetchOptions);
  const car = await response.json();

  // updating the values from database
  reg_no_text.value = car.reg_no;
  brand_text.value = car.brand;
  model_text.value = car.model;
  car_address_text.value = car.car_address;
  color_text.value = car.color;
  year_text.value = car.year_;
  fuel_type_text.value = car.fuel_type;
  transmission_text.value = car.transmission;
  seater_text.value = car.seater;
  rent_price_text.value = car.rent_price;
  pickup_date_text.value = car.pickup_date.substring(0, 10);
  pickup_time_text.value = car.pickup_time.substring(0, 5);
  dropoff_date_text.value = car.dropoff_date.substring(0, 10);
  dropoff_time_text.value = car.dropoff_time.substring(0, 5);
};

getCar(reg_no);

placeholder_1.onchange = async () => {
  const selectedFile = placeholder_1.files[0];
  //console.log(selectedFile);
  const fd = new FormData(formPH1);

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: fd,
  };

  const response = await fetch(`${url}/pictures/${reg_no}/1`, fetchOptions);
  const json = await response.json();
  container.style.border = none;
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
};

placeholder_2.onchange = async () => {
  const selectedFile = placeholder_2.files[0];
  //console.log(selectedFile);
  const fd = new FormData(formPH2);

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: fd,
  };

  const response = await fetch(`${url}/pictures/${reg_no}/2`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
};

placeholder_3.onchange = async () => {
  const selectedFile = placeholder_3.files[0];
  //console.log(selectedFile);
  const fd = new FormData(formPH3);

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: fd,
  };

  const response = await fetch(`${url}/pictures/${reg_no}/3`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
};

placeholder_4.onchange = async () => {
  const selectedFile = placeholder_4.files[0];
  //console.log(selectedFile);
  const fd = new FormData(formPH4);

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: fd,
  };

  const response = await fetch(`${url}/pictures/${reg_no}/4`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
};

placeholder_5.onchange = async () => {
  const selectedFile = placeholder_5.files[0];
  //console.log(selectedFile);
  const fd = new FormData(formPH5);

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: fd,
  };

  const response = await fetch(`${url}/pictures/${reg_no}/5`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
};

delete_PH1.addEventListener("click", async () => {
  const fetchOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(`${url}/pictures/${reg_no}/1`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    //alert(json.message);
    window.location.reload();
  }
});

delete_PH2.addEventListener("click", async () => {
  const fetchOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(`${url}/pictures/${reg_no}/2`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    //alert(json.message);
    window.location.reload();
  }
});

delete_PH3.addEventListener("click", async () => {
  const fetchOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(`${url}/pictures/${reg_no}/3`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    //alert(json.message);
    window.location.reload();
  }
});

delete_PH4.addEventListener("click", async () => {
  const fetchOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(`${url}/pictures/${reg_no}/4`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    //alert(json.message);
    window.location.reload();
  }
});

delete_PH5.addEventListener("click", async () => {
  const fetchOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(`${url}/pictures/${reg_no}/5`, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    //alert(json.message);
    window.location.reload();
  }
});

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(form);

  for (const [prop, value] of Object.entries(data)) {
    if (value === "") {
      delete data[prop];
    }
  }

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  };
  console.log(user.id);
  const response = await fetch(`${url}/car/${reg_no}/` + user.id, fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    location.href = "userCar.html";
  }
});
