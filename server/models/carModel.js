"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getHomeCars = async () => {
  try {
    const queries =
      "select *,avg(homeCar.rating) as average_rating from (SELECT c.reg_no, c.brand, r.rating, c.model, c.seater, c.fuel_type, c.transmission, c.rent_price, homePics.file_name , bp.name as bookingPerson " +
      "FROM car c " +
      //"left outer join person p on c.person_id=p.id " +
      "left outer join booking b on b.car_reg_no=c.reg_no " +
      "left outer join person bp on b.person_id = bp.id " +
      "left outer join review r on b.id = r.booking_id " +
      "left outer join (SELECT * FROM pictures group by car_reg_no) homePics on c.reg_no = homePics.car_reg_no) homeCar group by homeCar.reg_no";
    // we need car brand, car name , rating, seater, fuel, transmission rent price and post name
    // For shilpa's use
    //"left outer join pictures homePics on c.reg_no = homePics.car_reg_no";
    const [rows] = await promisePool.query(queries);

    return rows;
  } catch (e) {
    console.error("error", e.message);
  }
};

const getCarByUserId = async (userId, res) => {
  try {
    const sql =
      "select * from (select *,avg(homeCar.rating) as average_rating from (SELECT p.id, c.reg_no, c.brand, r.rating, c.model, c.seater, c.fuel_type, c.transmission, c.rent_price, homePics.file_name , bp.name as bookingPerson " +
      "FROM car c " +
      "left outer join person p on p.id = c.person_id " +
      "left outer join booking b on b.car_reg_no=c.reg_no " +
      "left outer join person bp on b.person_id = bp.id " +
      "left outer join review r on b.id = r.booking_id " +
      "left outer join (SELECT * FROM pictures group by car_reg_no) homePics on c.reg_no = homePics.car_reg_no) homeCar group by homeCar.reg_no) as " +
      "personCar where personCar.id=?";
    const values = [userId];
    const [rows] = await promisePool.query(sql, values);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getCarByRegNum = async (carRegNum, res) => {
  try {
    const sql = "select * from car c " + "where c.reg_no=?";
    const values = [carRegNum];
    const [rows] = await promisePool.query(sql, values);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addCar = async (carObject, res, user_id) => {
  console.log("Adding car", carObject);

  // Hard coded values to be changed later
  const car_address = "Espoo ";
  const pickup_date = "2022-11-10";
  const pickup_time = "10:30:00";
  const dropoff_date = "2022-11-12";
  const dropoff_time = "10:30:00";
  try {
    const sql =
      "INSERT INTO car (reg_no, brand, model, year_, transmission, fuel_type, seater, color, rent_price, car_address, pickup_date, pickup_time, dropoff_date, dropoff_time, person_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      carObject.reg_no,
      carObject.brand,
      carObject.model,
      carObject.year_,
      carObject.transmission,
      carObject.fuel_type,
      carObject.seater,
      carObject.color,
      carObject.rent_price,
      /*       car_address,
      pickup_date,
      pickup_time,
      dropoff_date,
      dropoff_time, */
      carObject.car_address,
      carObject.pickup_date,
      carObject.pickup_time,
      carObject.dropoff_date,
      carObject.dropoff_time,
      user_id,
    ];

    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const deleteCarByRegId = async (carRegId, res) => {
  try {
    const [rows] = await promisePool.query("DELETE FROM car WHERE reg_no = ?", [
      carRegId,
    ]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const modifyCarByRegId = async (carObject, res) => {
  console.log("Modifying car", carObject);
  try {
    const sql =
      "Update car set brand=?, model=?, year_=?, transmission=?, fuel_type=?, seater=?, color=?, rent_price=?, car_address=?, pickup_date=?, pickup_time=?, dropoff_date=?, dropoff_time=?, person_id=? where reg_no=?";
    const values = [
      carObject.brand,
      carObject.model,
      carObject.year_,
      carObject.transmission,
      carObject.fuel_type,
      carObject.seater,
      carObject.color,
      carObject.rent_price,
      carObject.car_address,
      carObject.pickup_date,
      carObject.pickup_time,
      carObject.dropoff_date,
      carObject.dropoff_time,
      carObject.person_id,
      carObject.reg_no,
    ];

    const [result] = await promisePool.query(sql, values);
    return result;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getHomeCars,
  getCarByUserId,
  getCarByRegNum,
  addCar,
  deleteCarByRegId,
  modifyCarByRegId,
};
