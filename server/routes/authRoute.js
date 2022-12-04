"use strict";

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");

router.post(
  "/register",
  body("name").isLength({ min: 3 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("dob").isDate(),
  body("phone_").notEmpty(),
  body("street_address").notEmpty(),
  body("city").notEmpty(),
  body("postal_code").notEmpty(),
  body("license").notEmpty(),
  body("password").isLength({ min: 8 }).trim(),
  userController.add_user
);

module.exports = router;
