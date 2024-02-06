const { body } = require('express-validator');

exports.registerValidator = [
  body('user_name').notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
  body('user_password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];