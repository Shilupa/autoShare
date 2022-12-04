'use strict';

const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router
  .get('/',carController.get_home_cars
  
  
  
  );

  module.exports = router;
