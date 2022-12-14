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

    let Comment;
    if (random == 0) {
      Comment = "Car was aweful, I would not recommend this car for anyone.";
    } else if (random == 1) {
      Comment = "Car was okay. But, I would still not recommend for the rent.";
    } else if (random == 2) {
      Comment =
        "Car was okay. Had some problem with front glass wiper and seat warmer.";
    } else if (random == 3) {
      Comment = "Car was fine. I would appriciate if the car was bot cleaner.";
    } else if (random == 4) {
      Comment = "Car was good. Best value for money.";
    } else {
      Comment =
        "Car was perfect. Luxurious car at reasonable price. Humble car owner. I did not had any issue while pickup and dropoff.";
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
