const express = require('express');
const {registerValidator}= require("../validators/user.validaotr")
const UserController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register',registerValidator, UserController.register);
router.post('/login', UserController.login);

module.exports = router;