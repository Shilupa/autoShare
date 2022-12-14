"use strict";
const carModel = require("../models/carModel");
const { validationResult } = require("express-validator");

const get_home_cars = async (req, res) => {
  const cars = await carModel.getHomeCars();
  res.json(cars);
};

const get_car_by_userId = async (req, res) => {
  //console.log(req.params.userId);
  const cars = await carModel.getCarByUserId(req.params.userId, res);
  res.json(cars);
};

const get_car_by_reg = async (req, res) => {
  const cars = await carModel.getCarByRegNum(req.params.carReg, res);
  res.json(cars);
};

const get_car_all_info_by_reg = async (req, res) => {
  const cars = await carModel.getCarAllInfoByRegNum(req.params.carReg, res);
  res.json(cars);
};

const add_car = async (req, res) => {
  console.log("creating a new car: ", req.body);
  const newCar = req.body;
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const result = await carModel.addCar(newCar, res, req.params.userId);
    //res.status(201).json({ message: "car created ", status: 200 });
    if (result === 0) {
      res.json({ message: "Car already exists!", status: 400 });
    } else {
      res.json({ message: "Car created", status: 201 });
    }
  } else {
    res
      .status(400)
      .json({ message: "car creation failed", errors: errors.array() });
  }
};

const delete_car = async (req, res) => {
  const result = await carModel.deleteCarByRegId(req.params.carRegId, res);
  console.log("car deleted", result);
  if (result.affectedRows > 0) {
    res.json({ message: "car deleted" });
  } else {
    res.status(404).json({ message: "car delete failed" });
  }
};

const modify_car = async (req, res) => {
  const car = req.body;
  car.reg_no = req.params.carRegId;
  car.person_id = req.params.userId;

  console.log("Bibek bro: ", req.params.carRegId, req.params.userId);

  const result = await carModel.modifyCarByRegId(car, res);
  console.log(result.affectedRows);
  if (result.affectedRows > 0) {
    res.json({ message: "car modified", userId: car.reg_no });
  } else {
    res
      .status(404)
      .json({ message: "There doesnot exist any car with this reg" });
  }
};

module.exports = {
  get_home_cars,
  get_car_by_reg,
  get_car_all_info_by_reg,
  add_car,
  delete_car,
  modify_car,
  get_car_by_userId,
};
