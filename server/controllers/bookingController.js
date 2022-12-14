"use strict";
const bookingModel = require("../models/bookingModel");
const { validationResult } = require("express-validator");

const get_all_bookings = async (req, res) => {
  const cars = await bookingModel.getAllBookings();
  res.json(cars);
};

const get_booking_by_reg = async (req, res) => {
  const cars = await bookingModel.getBookingByRegNum(req.params.carReg, res);
  res.json(cars);
};

const add_booking = async (req, res) => {
  console.log("creating a new booking: ", req.body);
  const newBooking = req.body;
  const errors = validationResult(req);
  console.log("error: ", errors);

  if (errors.isEmpty()) {
    const result = await bookingModel.addBooking(newBooking, res);
    res.json({ message: "booking created", status: 201, newUserId: result });
  } else {
    res
      .status(400)
      .json({ message: "booking creation failed", errors: errors.array() });
  }
};

const delete_booking = async (req, res) => {
  const result = await bookingModel.deleteBookingById(
    req.params.bookingId,
    res
  );
  console.log("booking deleted", result);
  if (result.affectedRows > 0) {
    res.json({ message: "booking deleted" });
  } else {
    res.status(404).json({ message: "booking delete failed" });
  }
};

const modify_booking = async (req, res) => {
  const booking = req.body;
  booking.id = req.params.bookingId;
  const result = await bookingModel.modifyBookingById(booking, res);
  console.log(result.affectedRows);
  if (result.affectedRows > 0) {
    res.json({ message: "booking modified", userId: booking.id });
  } else {
    res.status(404).json({
      message: "There doesnot exist any booking with this booking id",
    });
  }
};

module.exports = {
  get_all_bookings,
  get_booking_by_reg,
  add_booking,
  delete_booking,
  modify_booking,
};
