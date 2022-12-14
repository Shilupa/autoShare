"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const queries = "SELECT * from person";
    const [rows] = await promisePool.query(queries);
    return rows;
  } catch (e) {
    console.error("error", e.message);
  }
};

const getUserById = async (userId, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT id, name, email, phone_, street_address FROM person WHERE id = ?",
      [userId]
    );
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addUser = async (userObject, res) => {
  let emailExist = false;
  try {
    const [userRow] = await promisePool.query("SELECT * from person");
    userRow.forEach((user) => {
      if (user.email == userObject.email) {
        emailExist = true;
      }
    });

    if (emailExist) {
      return 0;
    }
    const sql =
      "INSERT INTO person (name, email, password, street_address, phone_, city, postal_code_,license, gender, dob, role_) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      userObject.name,
      userObject.email,
      userObject.password,
      userObject.street_address,
      userObject.phone_,
      userObject.city,
      userObject.postal_code_,
      userObject.license,
      userObject.gender,
      userObject.dob,
      userObject.role_,
    ];

    const [result] = await promisePool.query(sql, values);

    // filling profile database file with null
    await promisePool.query(
      "insert into profile (person_id, file) values(?, ?)",
      [result.insertId, null]
    );

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
      "Update person set name=?, password=?, street_address=?, phone_=?, city=?, postal_code_=?, license=?, gender=?, dob=?, role_=? where id=?";
    const values = [
      userObject.name,
      userObject.password,
      userObject.street_address,
      userObject.phone_,
      userObject.city,
      userObject.postal_code_,
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
const getUserLogin = async (email) => {
  try {
    const [rows] = await promisePool.execute(
      "SELECT * FROM person WHERE email = ?",
      email
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  modifyUserById,
  getUserLogin,
};