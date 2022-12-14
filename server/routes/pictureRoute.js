"use strict";

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const pictureController = require("../controllers/pictureController");
const multer = require("multer");

var fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-");
  },
});

const upload = multer({ storage: fileStorage });

router
  .get("/:regNo", pictureController.get_picture_by_reg_no)
  .post(
    "/:regNo/:placeHolder",
    upload.array("file_name", 1),
    pictureController.add_picture_by_reg_no
  )
  .delete("/:regNo/:placeHolder", pictureController.delete_picture_by_reg_no);

module.exports = router;
