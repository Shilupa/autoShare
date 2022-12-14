"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllBookings = async () => {
  try {
    const queries = "SELECT * from booking";
    const [rows] = await promisePool.query(queries);
    return rows;
  } catch (e) {
    console.error("error", e.message);
  }
};

const getBookingByRegNum = async (carRegNum, res) => {
  try {
    const sql = "select * from booking where car_reg_no=?";
    const values = [carRegNum];
    const [rows] = await promisePool.query(sql, values);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getBookingByUserId = async (userId, res) => {
  try {
    const sql =
      "select car.brand, car.pickup_date, car.rent_price, booking.intended_hour_of_booking, pics.file_name  from booking " +
      "inner join car on car.reg_no = booking.car_reg_no " +
      "left outer join (SELECT * FROM pictures group by car_reg_no) pics on car.reg_no = pics.car_reg_no " +
      "where booking.person_id=?";
    const values = [userId];
    const [rows] = await promisePool.query(sql, values);
    console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addBooking = async (bookingObject, res) => {
  console.log("Adding booking", bookingObject);
  try {
    const sql =
      "INSERT INTO booking (intended_hour_of_booking, intended_distance_of_travel, person_id, car_reg_no) VALUES (?, ?, ?, ?)";
    const values = [
      bookingObject.intended_hour_of_booking,
      bookingObject.intended_distance_of_travel,
      bookingObject.person_id,
      bookingObject.car_reg_no,
    ];
    //
    const [result] = await promisePool.query(sql, values);

    const random = Math.floor(Math.random() * 6);

    const randomquote = Math.floor(Math.random() * 3);
    const badreview = [
      "Car was aweful, I would not recommend this car for anyone.",
      "Car condition id not good, need some maintenance.",
      "Car seat was uncomfortable, not a good experience.",
      "Horrible experience ever. Car owner could have considered in the maintenance.",
      "The car had dent already before but then the car owner said it was my fault. Not happy with it and won't recommend.",
    ];
    const okreview = [
      "Car was okay. But, I would still not recommend for the rent.",
      "Car was normal, nothing extra. I'd choose other cars than this.",
      "Car needs cleaning and was smelly. Until than I'd not recommend anyone.",
      "The car stopped suddenly in the highway and this happened much often. Needs fixing",
      "There was something sticky in the car seat all over. Informed the owner but he assumed it was us who created the problem. Not happy with overall experience",
    ];
    const averagereview = [
      "Car was okay. Had some problem with front glass wiper and seat warmer.",
      "Car was average.",
      "Wished it had summer tires already. Other than that everything was ok.",
      "The price was much more than the experience we got with the car. Except that everything was good.",
      "Had a nice experience but there was some smell in the car.",
    ];
    const goodreview = [
      "We booked car for a week and was a good experience.",
      "Car was fine. I would appriciate if the car was a bit cleaner.",
      "Car war fair and worked as expected. Price was slightly more than expected.",
      "Car's door had some issue. Apparently it can be fixed. That's the only issue we had.",
      "Nothing extra. Good experience though.",
    ];

    const greatreview = [
      "Car was good. Best value for money.",
      "My partner got really happy with the car. Now I'm also really impressed.",
      "I would book this car again in future. Had a smooth and comfortable ride.",
      "I booked the car for 10 days and had a pleasant experience.",
      "The pickup location was nearby to my place and price was affordable. In overall I recommend and would book this car again.",
    ];
    const excellentreview = [
      "Car was perfect. Luxurious car at reasonable price. Humble car owner. I did not had any issue while pickup and dropoff.",
      "The most affortable car rent I ever rented and would recommend to anyone who are on a budget.",
      "Owner was really easy to deal with and had the best experience with the car.",
      "Extremely glad that I chose autoshare. Booking was really easy and the car was very comfortable. Our family loved it.",
      "I am not rich but the car made me feel rich. Great deal and awesome memory with this car. Srongly recommend.",
    ];
    let Comment;
    if (random == 0) {
      Comment = badreview[randomquote];
    } else if (random == 1) {
      Comment = okreview[randomquote];
    } else if (random == 2) {
      Comment = averagereview[randomquote];
    } else if (random == 3) {
      Comment = goodreview[randomquote];
    } else if (random == 4) {
      Comment = greatreview[randomquote];
    } else {
      Comment = excellentreview[randomquote];
    }

    const sql2 =
      "INSERT INTO review (comment, rating, booking_id) VALUES (?, ?, ?)";
    const values2 = [Comment, random, result.insertId];
    await promisePool.query(sql2, values2);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const deleteBookingById = async (bookingId, res) => {
  try {
    const [rows] = await promisePool.query("DELETE FROM booking WHERE id = ?", [
      bookingId,
    ]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const modifyBookingById = async (bookingCar, res) => {
  console.log("Modifying booking", bookingCar);
  try {
    const sql =
      "Update booking set intended_hour_of_booking=?, intended_distance_of_travel=?, person_id=?, car_reg_no=? where id=?";
    const values = [
      bookingCar.intended_hour_of_booking,
      bookingCar.intended_distance_of_travel,
      bookingCar.person_id,
      bookingCar.car_reg_no,
      bookingCar.id,
    ];

    const [result] = await promisePool.query(sql, values);
    return result;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getAllBookings,
  getBookingByRegNum,
  addBooking,
  deleteBookingById,
  modifyBookingById,
  getBookingByUserId,
};
