"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { addUser } = require("../models/userModel");
require("dotenv").config();

const login = (req, res) => {
  // TODO: add passport authenticate
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("login", user, info);
    if (err || !user) {
      return res.status(400).json({
        message: "Entered email or password is not correct",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed json web token with the contents of user object and return it in the response.
      // don not include password in token/user object when sending to client
      delete user.password;
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
};

const register = async (req, res) => {
  console.log("creating a new user: ", req.body);
  const newUser = req.body;
  console.log(newUser);
  if (!newUser.role_) {
    newUser.role_ = "User";
  }
  const errors = validationResult(req);
  console.log("error: ", errors);

  if (errors.isEmpty()) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newUser.password, salt);
    newUser.password = passwordHash;
    const result = await addUser(newUser, res);
    if (result === 0) {
      res.json({ message: "Email already in use!", status: 400 });
    } else {
      res.json({ message: "User created", status: 201 });
    }
  } else {
    res
      .status(400)
      .json({ message: "user creation failed", errors: errors.array() });
  }
};

const logout = (req, res) => {
  console.log("some user logged out");
  res.json({ message: "logged out" });
};

module.exports = {
  login,
  logout,
  register,
};
