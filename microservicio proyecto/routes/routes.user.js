const express = require('express');
const {validateRegister, validateLogin}= require("../validators/valid.user")

const UserController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register',validateRegister, UserController.register); 
router.post('/login',validateLogin, UserController.login);
router.get('/users/:user_id', UserController.getUser);
router.get('/users',UserController.getAllUsers);
router.put('/users/:user_id', UserController.updateUser);

module.exports = router;

