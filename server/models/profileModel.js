"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

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
    const sql = "INSERT INTO profile (file, person_id) VALUES (?, ?)";
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
    ];

    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

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

module.exports = {
  getProfileByUserId,
};
