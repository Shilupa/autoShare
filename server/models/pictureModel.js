"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();
const fs = require("fs");

const getPictureByRegNo = async (carRegNo, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT file_name FROM pictures WHERE car_reg_no = ?",
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
/*
const deleteUserById = async (userId, res) => {
  try {
    const [rows] = await promisePool.query("DELETE FROM person WHERE id = ?", [
      userId,
    ]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const modifyUserById = async (userObject, res) => {
  try {
    const sql =
      "Update person set name=?, email=?, password=?, street_address=?, phone_=?, city=?, postal_code=?, license=?, gender=?, dob=?, role_=? where id=?";
    const values = [
      userObject.name,
      userObject.email,
      userObject.password,
      userObject.street_address,
      userObject.phone_,
      userObject.city,
      userObject.postal_code,
      userObject.license,
      userObject.gender,
      userObject.dob,
      userObject.role_,
      userObject.id,
    ];
    const [result] = await promisePool.query(sql, values);
    return result;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
*/
module.exports = {
  getPictureByRegNo,
  addPictureByRegNo,
};
