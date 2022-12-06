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

    const [result] = await promisePool.query(sql, values);
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
};
