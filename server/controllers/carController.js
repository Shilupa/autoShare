'use strict';
const carModel = require('../models/carModel');

const get_all_car = async (req, res) => {
    const cars = await carModel.getAllCars();
    res.json(cars);
  };

  module.exports = {
    get_all_car,
  };