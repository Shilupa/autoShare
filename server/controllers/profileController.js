"use strict";
const profileModel = require("../models/profileModel");
const { validationResult } = require("express-validator");

const get_profile_by_person_id = async (req, res) => {
  const profile = await profileModel.getProfileByUserId(req.params.userId, res);
  if (profile) {
    res.json(profile);
  } else {
    res.sendStatus(404);
  }
};

const add_profile_by_person_id = async (req, res) => {
  console.log("creating a new user: ", req.body);
  const newUser = req.body;
  if (!newUser.role_) {
    newUser.role_ = "User";
  }
  const errors = validationResult(req);
  console.log("error: ", errors);

  if (errors.isEmpty()) {
    const result = await userModel.addUser(newUser, res);
    res.status(201).json({ message: "user created", newUserId: result });
  } else {
    res
      .status(400)
      .json({ message: "user creation failed", errors: errors.array() });
  }
};

const delete_user = async (req, res) => {
  const result = await userModel.deleteUserById(req.params.userId, res);
  console.log("user deleted", result);
  if (result.affectedRows > 0) {
    res.json({ message: "user deleted" });
  } else {
    res.status(404).json({ message: "user delete failed" });
  }
};

const modify_user = async (req, res) => {
  const user = req.body;
  user.id = req.params.userId;
  if (!user.role_) {
    user.role_ = "User";
  }
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
  get_profile_by_person_id,
  add_profile_by_person_id,
};
