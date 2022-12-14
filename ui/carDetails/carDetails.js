"use strict";
const url = "http://localhost:3000"; // change url when uploading to server
//const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

//selecting from normal view
const btnLogout = document.querySelector("#btn-logout");
const userHtml = document.querySelector("#user-html");

//selecting from hamburger
const hamburgerBtnLogout = document.querySelector("#hamburger-logout");
const hamburgerUserHtml = document.querySelector("#hamburger-user-html");

//imagecontainer
const imageContainer = document.querySelector(".slideshow-container");

const carCard = document.querySelector(".card");
const carName = document.querySelector(".car-name");
const fuel = document.querySelector(".fuel-value");
const gearbox = document.querySelector(".gearbox-value");
const year = document.querySelector(".year-value");
const startDate = document.querySelector(".start-value");
const startTime = document.querySelector(".start-time-value");
const endDate = document.querySelector(".end-value");
const endTime = document.querySelector(".end-time-value");
const numberOfPeople = document.querySelector(".number-of-people-value");
const rentPrice = document.querySelector(".rent-price-value");
const user = document.querySelector(".user-value");
const phone = document.querySelector(".phone-value");
const email = document.querySelector(".email-value");
const address = document.querySelector(".address-value");
const htmlImage = document.querySelector(".images");
const swipeLeft = document.querySelector("#left");
const swipeRight = document.querySelector("#right");

// reviews -card selector
const reviews_card = document.querySelector(".reviews-card");

// Map address
const map_address = document.querySelector("#latlng");

const token = sessionStorage.getItem("token");
const tokenUser = JSON.parse(sessionStorage.getItem("user"));
//console.log(tokenUser, token);

//checking token if it exists
if (token != null) {
  //normal page
  userHtml.innerHTML = `Hi ${tokenUser.name}!`;

  userHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });

  //hamburger
  hamburgerBtnLogout.style.display = "visible";
  hamburgerUserHtml.innerHTML = `Hi ${tokenUser.name}!`;

  hamburgerUserHtml.addEventListener("click", () => {
    location.href = "../userProfile/userProfile.html";
  });
} else {
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

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const reg_no = getQParam("id");

// add existing car all info data to form
const getCar = async (reg_no) => {
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const response = await fetch(url + "/car/allinfo/" + reg_no, fetchOptions);
  const car = await response.json();

  const reviews = [];
  const pictures = [];

  car.forEach((element) => {
    const review = {};
    review.booking_id = element.booking_id;
    review.review_id = element.review_id;
    review.profile = element.bp_file;
    review.comment = element.comment;
    review.rating = element.rating;
    review.bp_name = element.bp_name;
    reviews.push(review);

    const picture = {};
    picture.file_name = element.file_name;
    picture.placeholder = element.placeholder;

    pictures.push(picture);
  });

  console.log("details", car);

  const reviewseen = new Set();
  const uniqueReviews = reviews.filter((el) => {
    const duplicate = reviewseen.has(el.booking_id);
    reviewseen.add(el.booking_id);
    return !duplicate;
  });
  createReviewCard(uniqueReviews);
  console.log("unique reviews: ", uniqueReviews);

  const pictureseen = new Set();
  const uniquePictures = pictures.filter((el) => {
    const duplicate = pictureseen.has(el.placeholder);
    pictureseen.add(el.placeholder);
    return !duplicate;
  });
  console.log("unique pictures: ", uniquePictures);

  // sending car info and car owner information
  createCarCard(car[0]);
};
getCar(reg_no);

const createCarCard = (car) => {
  const h3 = document.createElement("h3");
  // Setting attribute for brand to use for filtering
  h3.setAttribute("className", "brand");
  h3.innerHTML = car.brand;
  carName.innerHTML = car.brand;
  fuel.innerHTML = car.fuel_type;
  gearbox.innerHTML = car.transmission;
  year.innerHTML = car.year_;
  numberOfPeople.innerHTML = car.seater;
  rentPrice.innerHTML = car.rent_price;
  map_address.value = car.car_address;

  // Splitting date string to remove unnecessary string
  const splittedStartDate = car.pickup_date.substring(0, 10);
  const splittedEndDate = car.dropoff_date.substring(0, 10);

  startDate.innerHTML = splittedStartDate;
  startTime.innerHTML = car.pickup_time;
  endDate.innerHTML = splittedEndDate;
  endTime.innerHTML = car.dropoff_time;

  // Fetching person data
  user.innerHTML = car.owner_name;
  phone.innerHTML = car.owner_phone;
  email.innerHTML = car.owner_email;
  address.innerHTML = car.owner_address;
};

const createReviewCard = (rev) => {
  rev.forEach((element) => {
    const reviews = document.createElement("div");
    reviews.setAttribute("class", "reviews");

    const booker_review = document.createElement("div");
    booker_review.setAttribute("class", "booker-review");

    // creating booker profile
    const booker_profile_text = '<img src="/images/user.png" alt="user image">';
    const booker_profile = document.createElement("div");
    booker_profile.setAttribute("class", "booker-profile");
    const name = document.createTextNode(element.bp_name);
    booker_profile.innerHTML = booker_profile_text;
    booker_profile.append(name);

    // creating rating
    const rating = document.createElement("div");
    rating.setAttribute("class", "booking-ratings");
    for (let i = 1; i < 6; i++) {
      if (i <= Math.round(element.rating)) {
        const text = '<span class="fa fa-star checked"></span>';
        const span = document.createElement("span");
        span.innerHTML = text;
        rating.appendChild(span);
      } else {
        const text = '<span class="fa fa-star"></span>';
        const span = document.createElement("span");
        span.innerHTML = text;
        rating.appendChild(span);
      }
    }

    // creating comment
    const comment = document.createElement("div");
    comment.setAttribute("class", "comments");
    const comment_node = document.createTextNode(element.comment);
    comment.append(comment_node);

    booker_review.appendChild(booker_profile);
    booker_review.appendChild(rating);
    reviews.appendChild(booker_review);
    reviews.appendChild(comment);

    reviews_card.appendChild(reviews);
  });
};

/* const createPicSlide = (pics) => {
  pics.forEach((element) => {

} */

// Fetching user data or car images from respective databases
/* const getData = async (url) => {
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const response = await fetch(url, fetchOptions);
  return await response.json();
};
 */
