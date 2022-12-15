"use strict";
const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const get_all_users = async (req, response) => {
  const users = await userModel.getAllUsers();
  response.json(users);
};

const get_user = async (req, res) => {
  const user = await userModel.getUserById(req.params.userId, res);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const delete_user = async (req, res) => {
  const result = await userModel.deleteUserById(req.params.userId, res);
  console.log("user deleted", result);
  if (result.affectedRows > 0) {
    res.json({ message: "user deleted", status: 200 });
  } else {
    res.status(404).json({ message: "user delete failed" });
  }
};

const modify_user = async (req, res) => {
  // Creating user object
  const user = req.body;
  user.id = req.params.userId;

  if (!user.role_) {
    user.role_ = "User";
  }
  console.log("Hello: ", user);

  // Encrpting password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(user.password, salt);
  user.password = passwordHash;

  const result = await userModel.modifyUserById(user, res);
  console.log(result.affectedRows);
  if (result.affectedRows > 0) {
    res.json({ message: "user modified", userId: user.id });
  } else {
    res
      .status(404)
      .json({ message: "There doesnot exist any user with this ID" });
  }
};

module.exports = {
  get_all_users,
  get_user,
  modify_user,
  delete_user,
};
