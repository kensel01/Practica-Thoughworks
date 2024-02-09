const { body, validationResult } = require('express-validator');

// Middleware de validación para crear un proyecto
const validateCreateProyect = [
  body('name').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('description').notEmpty().withMessage('La descripción del proyecto es obligatoria'),
  body('createby').notEmpty().withMessage('Debe indicar el creador del proyecto'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = {validateCreateProyect};