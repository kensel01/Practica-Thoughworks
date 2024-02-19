const express = require('express');
const {validateRegister, validateLogin}= require("../validators/valid.user")

const UserController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register',validateRegister, UserController.register); 
router.post('/login',validateLogin, UserController.login);
router.get('/user/:user_id', UserController.getUser);

module.exports = router;

