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
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

router
  .get("/:regNo", pictureController.get_picture_by_reg_no)
  .post(
    "/:regNo",
    upload.array("file_name", 50),
    pictureController.add_picture_by_reg_no
  );

module.exports = router;
