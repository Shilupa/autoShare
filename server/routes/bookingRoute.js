"use strict";

const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router
  .get("/", bookingController.get_all_bookings)
  .get("/:carReg", bookingController.get_booking_by_reg)
  .post("/", bookingController.add_booking)
  .put("/:bookingId", bookingController.modify_booking)
  .delete("/:bookingId", bookingController.delete_booking);

module.exports = router;
