'use strict';

const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/userController');
const multer = require('multer');


const file_filter = (req, file, cb) =>{
  const acceptedFileType = ['image/jpeg','image/png','image/gif'];
  if(acceptedFileType.includes(file.mimetype)){
      cb(null, true);
  } else{
      cb(null, false);
  }
};

const upload = multer({dest: 'uploads/', fileFilter: file_filter});


router
.get('/', userController.get_all_users)
.get('/:userId', userController.get_user)
.post('/', userController.add_user)
.put('/:userId', userController.modify_user)
.delete('/:userId', userController.delete_user)


;

  module.exports = router;
