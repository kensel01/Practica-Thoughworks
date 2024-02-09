const { body, validationResult } = require('express-validator');

// Middleware de validación para crear un proyecto
const validateCreateProyect = [
  body('nombre').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('descripcion').notEmpty().withMessage('La descripción del proyecto es obligatoria'),
  body('fechaInicio').isDate().withMessage('La fecha de inicio debe ser una fecha válida'),
  body('fechaFin').isDate().withMessage('La fecha de fin debe ser una fecha válida'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];