'use strict';
const carModel = require('../models/carModel');

const get_home_cars = async (req, res) => {
    const cars = await carModel.getHomeCars();
    res.json(cars);
  };



  module.exports = {
    get_home_cars,
  };