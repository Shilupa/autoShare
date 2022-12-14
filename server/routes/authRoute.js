"use strict";

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { login, logout, register } = require("../controllers/authController");

router
  .post("/login", login)
  .post(
    "/register",
    body("name").isLength({ min: 3 }).trim().escape(),
    body("email").isEmail(),
    body("gender").notEmpty(),
    body("dob").isDate(),
    body("phone_").notEmpty().isNumeric().isLength({min:10 ,max:10}),
    body("street_address").notEmpty(),
    body("city").notEmpty(),
    body("postal_code_").notEmpty().isLength({min:5 ,max:5}),
    body("license").notEmpty().isNumeric().isLength({min:16 ,max:16}),
    body("password").isLength({ min: 8 }).trim(),
    register
  );

module.exports = router;
