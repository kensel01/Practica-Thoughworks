const jwt = require('jsonwebtoken');
const UserService = require('../service/user.service');
const bcrypt = require("bcrypt")
const { validationResult } = require('express-validator');

const UserController = {
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user_name, user_password, email } = req.body;
    const user = await UserService.createUser(user_name, user_password, email);
    res.status(201).json(user);
  },
  login: async (req, res) => {
    const { email, user_password } = req.body;
    const user = await UserService.findUserByName(email);
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
    const match = await bcrypt.compare(user_password, user.user_password.trim());
    if (match) {
      const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(400).json({ error: 'Contraseña incorrecta' });
    }
  },
  getUser: async (req, res) => {
    const user = await UserService.getUser(req.params.user_id);
    res.json(user);
  },
};

module.exports = UserController;