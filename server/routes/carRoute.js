"use strict";

const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const { body } = require("express-validator");

router
  .get("/", carController.get_home_cars)
  .post(
    "/",
    body("reg_no"),
    body("brand"),
    body("model"),
    body("year_"),
    body("transmission"),
    body("fuel_type"),
    body("seater"),
    body("color"),
    body("rent_price"),
    body("car_address"),
    body("pickup_date"),
    body("pickup_time"),
    body("dropoff_date"),
    body("dropoff_time"),
    body("person_id"),
    carController.add_car
  )
  .get("/:carReg", carController.get_car_by_reg)
  .put("/:carRegId", carController.modify_car)
  .delete("/:carRegId", carController.delete_car);
module.exports = router;
