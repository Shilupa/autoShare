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

const getCarByRegNum = async (carRegNum, res) => {
  try {
    const sql = "select * from car c "+
                "inner join person p on c.person_id=p.id "+
                "inner join booking b on b.car_reg_no = c.reg_no "+
                "inner join picture pic on pic.car_reg_no = c.reg_no";

    const values = [userObject.name, userObject.email,userObject.password, userObject.street_address, userObject.phone_, userObject.city, userObject.postal_code, userObject.license, userObject.gender, userObject.dob, userObject.role_];

    const [rows] = await promisePool.query("SELECT id, name, email FROM person WHERE id = ?", [carId]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getHomeCars,
  getCarByRegNum,

};


