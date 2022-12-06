"use strict";

const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router
  .get("/", carController.get_home_cars)
  .get("/:carReg", carController.get_car_by_reg)
  .post("/", carController.add_car)
  .put("/:carRegId", carController.modify_car)
  .delete("/:carRegId", carController.delete_car);
module.exports = router;
