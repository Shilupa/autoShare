"use strict";
const { end } = require("../database/db");
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

    // For Shilpa
    /*         "SELECT c.reg_no, c.brand, c.model, r.rating, r.comment, c.seater, c.fuel_type, c.transmission, c.rent_price, homePics.file_name, bp.name as bookingPerson " +
      "FROM car c " +
      //"left outer join person p on c.person_id=p.id " +
      "left outer join booking b on b.car_reg_no=c.reg_no " +
      "left outer join person bp on b.person_id = bp.id " +
      "left outer join review r on b.id = r.booking_id " +
      "left outer join pictures homePics on c.reg_no = homePics.car_reg_no";  */
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

const getCarAllInfoByRegNum = async (carRegNum, res) => {
  try {
    const sql =
      "select " +
      "p.id as owner_id, " +
      "p.name as owner_name, " +
      "p.email as owner_email, " +
      "p.street_address as owner_address, " +
      "p.phone_ as owner_phone, " +
      "p.city as owner_city, " +
      "p.postal_code as owner_postal_code, " +
      "p.license as owner_license, " +
      "p.gender as owner_gender, " +
      "p.dob as owner_dob, " +
      "p.role_ as owner_role, " +
      "bp.id as bp_id, " +
      "bp.name as bp_name, " +
      "bp.email as bp_email, " +
      "bp.street_address as bp_address, " +
      "bp.phone_ as bp_phone, " +
      "bp.city as bp_city, " +
      "bp.postal_code as bp_postal_code, " +
      "bp.license as bp_license, " +
      "bp.gender as bp_gender, " +
      "bp.dob as bp_dob, " +
      "bp.role_ as bp_role, " +
      "c.reg_no as reg_no, " +
      "c.brand as brand, " +
      "c.model as model, " +
      "c.year_ as yeay_, " +
      "c.transmission as transmission, " +
      "c.fuel_type as fuel_type, " +
      "c.seater as seater, " +
      "c.color as color, " +
      "c.rent_price as rent_price, " +
      "c.car_address as car_address, " +
      "c.pickup_date as pickup_date, " +
      "c.pickup_time as pickup_time, " +
      "c.dropoff_date as dropoff_date, " +
      "c.dropoff_time as dropoff_time, " +
      "b.id as booking_id, " +
      "b.intended_hour_of_booking as intended_hour_of_booking, " +
      "b.intended_distance_of_travel as intended_distance_of_travel, " +
      "b.car_reg_no as booking_car_reg_no, " +
      "r.id as review_id, " +
      "r.comment as comment, " +
      "r.rating as rating, " +
      "pic.placeholder as placeholder, " +
      "pic.file_name as file_name, " +
      "ownpr.file as owner_file, " +
      "bpr.file as bp_file " +
      "from car c " +
      "left outer join person p on p.id = c.person_id " +
      "left outer join booking b on b.car_reg_no=c.reg_no " +
      "left outer join person bp on b.person_id = bp.id " +
      "left outer join review r on b.id = r.booking_id " +
      "left outer join profile ownpr on p.id = ownpr.person_id " +
      "left outer join profile bpr on p.id = bpr.person_id " +
      "left outer join pictures pic on c.reg_no = pic.car_reg_no " +
      "where c.reg_no = ?";
    const values = [carRegNum];
    const [rows] = await promisePool.query(sql, values);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addCar = async (carObject, res, user_id) => {
  console.log("Adding car", carObject);

  let carExist = false;
  try {
    const [carRow] = await promisePool.query("SELECT * from car");
    carRow.forEach((car) => {
      if (car.reg_no == carObject.reg_no) {
        carExist = true;
      }
    });

    if (carExist) {
      return 0;
    }

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
      carObject.car_address,
      carObject.pickup_date,
      carObject.pickup_time,
      carObject.dropoff_date,
      carObject.dropoff_time,
      user_id,
    ];

    const [result] = await promisePool.query(sql, values);
    return result.affectedRows;
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
      "Update car set brand=?, model=?, year_=?, transmission=?, fuel_type=?, seater=?, color=?, rent_price=?, car_address=?, pickup_date=?, pickup_time=?, dropoff_date=?, dropoff_time=? where reg_no=? and person_id=?";
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
      carObject.reg_no,
      carObject.person_id,
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
  getCarAllInfoByRegNum,
  addCar,
  deleteCarByRegId,
  modifyCarByRegId,
};
