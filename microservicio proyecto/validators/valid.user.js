const { body, validationResult } = require("express-validator");

// Middleware de validación para el registro de usuarios
const validateRegister = [
  body("user_name")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),
  body("email").isEmail().withMessage("Debe ser un correo electrónico válido"),
  body("user_password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware de validación para el login de usuarios
const validateLogin = [
  body("user_name")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),
  body("user_password").notEmpty().withMessage("La contraseña es obligatoria"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateLogin, validateRegister };
