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
    console.log("hahaha", req.file);
    // Creating profile image object

    const profileImage = {
      file: null,
      person_id: null,
    };

    if (req.file) {
      profileImage.file = req.file.filename;
      await makeThumbnail(req.file.path, req.file.filename);
    } else {
      profileImage.file = null;
    }
    profileImage.person_id = req.params.userId;

    const result = await profileModel.addProfileByUserId(profileImage, res);
    res.status(201).json({ message: "profile added", newUserId: result });
  } else {
    res
      .status(400)
      .json({ message: "add profile failed", errors: errors.array() });
  }
};

module.exports = {
  get_profile_by_person_id,
  modify_profile_by_person_id,
};
