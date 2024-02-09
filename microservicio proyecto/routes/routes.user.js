const express = require('express');
const {registerValidator, validateLogin}= require("../validators/valid.user")

const UserController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register',registerValidator, UserController.register);
router.post('/login',validateLogin, UserController.login);

module.exports = router;