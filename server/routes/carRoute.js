'use strict';

const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router
  .route("/")
  .get(carController.get_all_car);

  module.exports = router;
