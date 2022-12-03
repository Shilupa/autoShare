"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();


const getHomeCars = async () => {
  try {
    const queries = "SELECT c.brand, c.model, r.rating, c.seater, c.fuel_type, c.transmission, c.rent_price, p.name "+
                      "FROM car c "+
                      "Inner join booking b on b.car_reg_no=c.reg_no "+
                      "Inner join review r on b.id = r.booking_id "+
                      "Inner join person p on p.id = c.person_id;"
    // we need car brand, car name , rating, seater, fuel, transmission rent price and post name
    const [rows] = await promisePool.query(queries);
    return rows;
  } catch (e) {
    console.error("error", e.message);
  }
};

module.exports = {
  getHomeCars,
};


