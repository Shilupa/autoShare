"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();


const getAllUsers = async () => {
  try {
    const queries = "SELECT * from person"
    const [rows] = await promisePool.query(queries);
    return rows;
  } catch (e) {
    console.error("error", e.message);
  }
};

module.exports = {
  getAllUsers,
};


