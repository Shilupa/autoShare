'use strict';
const userModel = require('../models/userModel');

const get_all_users = async (req, res) => {
    const users = await userModel.getAllUsers();
    res.json(users);
  };



  module.exports = {
    get_all_users,
  };