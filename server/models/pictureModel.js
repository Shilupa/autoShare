"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();
const fs = require("fs");

const getPictureByRegNo = async (carRegNo, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT placeholder, file_name FROM pictures WHERE car_reg_no = ?",
      [carRegNo]
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addPictureByRegNo = async (pictureObject, res) => {
  try {
    const deleteFile = await promisePool.query(
      "select file_name from pictures where car_reg_no=? and placeholder=?",
      [pictureObject.reg_no, pictureObject.placeholder]
    );

    try {
      deleteFile[0].forEach((file) => {
        fs.unlinkSync("./uploads/" + file.file_name);
        fs.unlinkSync("./thumbnails/" + file.file_name);
      });
    } catch (e) {}

    await promisePool.query(
      "Delete from pictures where car_reg_no=? and placeholder=?",
      [pictureObject.reg_no, pictureObject.placeholder]
    );

    await pictureObject.files.forEach((file) => {
      promisePool.query(
        "Insert into pictures (file_name, car_reg_no, placeholder) values (?, ?, ?)",
        [file, pictureObject.reg_no, pictureObject.placeholder]
      );
    });
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const deletePictureByRegNo = async (regNo, placeHolder, res) => {
  try {
    const [rows] = await promisePool.query(
      "DELETE FROM pictures WHERE car_reg_no = ? and placeholder = ?",
      [regNo, placeHolder]
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getPictureByRegNo,
  addPictureByRegNo,
  deletePictureByRegNo,
};
