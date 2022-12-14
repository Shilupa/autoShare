"use strict";
const url = "http://localhost:3000"; // change url when uploading to server
//const url = "https://suraj-bcwt.northeurope.cloudapp.azure.com/app";

//selecting from normal view
const btnLogout = document.querySelector("#btn-logout");
const userHtml = document.querySelector("#user-html");

//selecting from hamburger
const hamburgerBtnLogout = document.querySelector("#hamburger-logout");
const hamburgerUserHtml = document.querySelector("#hamburger-user-html");
const mainList = document.querySelector(".booking-list");

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
console.log("From home.js line 19", user, token);

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

(async () => {
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(`${url}/booking/user`, fetchOptions);
  const myBookings = await response.json();
  createBookingCard(myBookings);
  //console.log(profile);
})();

const createBookingCard = (bookingList) => {
  console.log(bookingList);
  console.log(user.name);
  bookingList.forEach((booking) => {
    const details =
      '<div class="booking-list-item">' +
      `<h4>${booking.brand}</h4>` +
      '<div class="car-image">' +
      `<img src="${url}/thumbnails/${booking.file_name}" alt="car"/>` +
      "</div>" +
      '<div class="booking-details">' +
      `<span id="booking-date"> Pickup date : ${booking.pickup_date.substring(
        0,
        10
      )}</span>` +
      `<span id="booked-hrs">Booked for : ${booking.intended_hour_of_booking} hours</span>` +
      `<span id="total-cost">Total estimated cost : ${
        booking.intended_hour_of_booking * booking.rent_price
      } Euros</span>` +
      "</div>" +
      "</div>";
    const detail = document.createElement("div");
    detail.innerHTML = details;
    mainList.append(detail);
  });
};
{
  /* <h4>As owner</h4>
          <!--should be owner or renter-->
          <div class="car-image">
            <img
              src="/images/photo-1525609004556-c46c7d6cf023.jfif"
              alt="car"
            />
          </div>
          <div class="booking-details">
            <span id="booking-date"> Booking date : 12/12/2022</span>
            <span id="booked-hrs">Booked for : 2 hours</span>
            <span id="total-cost">Total estimated cost : 50€</span>
          </div> */
}
