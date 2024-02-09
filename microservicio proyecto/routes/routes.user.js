const express = require('express');
const {validateRegister}= require("../validators/valid.user")
const {validateLogin}= require("../validators/valid.user")

const UserController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register',validateRegister, UserController.register); 
router.post('/login',validateLogin, UserController.login);

module.exports = router;