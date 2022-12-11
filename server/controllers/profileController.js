"use strict";
const profileModel = require("../models/profileModel");
const { validationResult } = require("express-validator");
const { makeThumbnail } = require("../utils/image");

const get_profile_by_person_id = async (req, res) => {
  const profile = await profileModel.getProfileByUserId(req.params.userId, res);
  if (profile) {
    res.json(profile);
  } else {
    res.sendStatus(404);
  }
};

const modify_profile_by_person_id = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    console.log("adding a profile: ", req.body);
    const profile = req.body;
    console.log("hahaha", req.file);
    if (req.file) {
      profile.file = req.file.filename;
      await makeThumbnail(req.file.path, req.file.filename);
    } else {
      profile.file = null;
    }
    profile.person_id = req.params.userId;
    const result = await profileModel.addProfileByUserId(profile, res);
    res.status(201).json({ message: "profile added", newUserId: result });
  } else {
    res
      .status(400)
      .json({ message: "add profile failed", errors: errors.array() });
  }
};

/*
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
*/
module.exports = {
  get_profile_by_person_id,
  modify_profile_by_person_id,
};
