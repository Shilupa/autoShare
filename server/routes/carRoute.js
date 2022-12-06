"use strict";

const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const { body } = require("express-validator");

router
  .get("/", carController.get_home_cars)
  .post(
    "/",
    body("reg_no").notEmpty(),
    body("brand").notEmpty(),
    body("model").notEmpty(),
    body("year_").notEmpty(),
    body("transmission").notEmpty(),
    body("fuel_type").notEmpty(),
    body("seater").notEmpty(),
    body("color").notEmpty(),
    body("rent_price").notEmpty(),
    body("car_address").notEmpty(),
    body("pickup_date").isDate(),
    body("pickup_time").notEmpty(),
    body("dropoff_date").isDate(),
    body("dropoff_time").notEmpty(),
    carController.add_car
  )
  .get("/:carReg", carController.get_car_by_reg)
  .put("/:carRegId", carController.modify_car)
  .delete("/:carRegId", carController.delete_car);
module.exports = router;
