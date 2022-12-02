"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCars = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT * FROM login");
    return rows;
  } catch (e) {
    console.error("error", e.message);
  }
};

module.exports = {
  getAllCars,
};