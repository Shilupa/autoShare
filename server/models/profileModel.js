"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();
const fs = require("fs");

const getProfileByUserId = async (userId, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT file FROM profile WHERE person_id = ?",
      [userId]
    );
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addProfileByUserId = async (profileObject, res) => {
  console.log("profileModel", profileObject);
  try {
    const deleteFile = await promisePool.query(
      "select file from profile where person_id=?",
      profileObject.person_id
    );
    if (deleteFile[0][0].file) {
      try {
        fs.unlinkSync("uploads/" + deleteFile[0][0].file);
        fs.unlinkSync("thumbnails/" + deleteFile[0][0].file);
      } catch (e) {
        console.log(e.message);
      }
    }

    const sql = "Update profile set file=? where person_id=?";
    const values = [profileObject.file, profileObject.person_id];

    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getProfileByUserId,
  addProfileByUserId,
};
