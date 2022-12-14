"use strict";

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const profileController = require("../controllers/profileController");
const multer = require("multer");

const file_filter = (req, file, cb) => {
  const acceptedFileType = ["image/jpeg", "image/png", "image/gif"];
  if (acceptedFileType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ dest: "uploads/", fileFilter: file_filter });

router
  .get("/:userId", profileController.get_profile_by_person_id)
  .put(
    "/:userId",
    upload.single("file"),
    profileController.modify_profile_by_person_id
  );

module.exports = router;
