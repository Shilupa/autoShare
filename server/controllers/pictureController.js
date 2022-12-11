"use strict";
const pictureModel = require("../models/pictureModel");
const { validationResult } = require("express-validator");
const { makeThumbnail } = require("../utils/image");

const get_picture_by_reg_no = async (req, res) => {
  const pictures = await pictureModel.getPictureByRegNo(req.params.regNo, res);
  if (pictures) {
    res.json(pictures);
    console.log("Pictures: ", pictures);
  } else {
    res.sendStatus(404);
  }
};

const add_picture_by_reg_no = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const pictures = req.body;

    pictures.files = [];

    req.files.forEach((element) => {
      pictures.files.push(element.filename);
      console.log("See this file: ", element);
      makeThumbnail(element.path, element.filename);
    });

    pictures.reg_no = req.params.regNo;

    const result = await pictureModel.addPictureByRegNo(pictures, res);

    res.status(201).json({ message: "picture added", pictures: result });
  } else {
    res
      .status(400)
      .json({ message: "add pictures failed", errors: errors.array() });
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
  get_picture_by_reg_no,
  add_picture_by_reg_no,
};
