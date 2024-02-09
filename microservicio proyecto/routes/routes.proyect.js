const express = require("express")
const router = express.Router();
const pool = require("../db");
const {
  getAllproyect,
  getProyect,
  createProyect,
  updateProyect,
} = require("../controllers/proyect.controller");
const {validateCreateProyect} = require("../validators/valid.proyect")
const verificarPermisos = require("../middleware/permisos") 

// Authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

router.get("/proyect", authMiddleware, getAllproyect);

router.get("/proyect/:id", authMiddleware, getProyect);

router.post("/proyect", authMiddleware,validateCreateProyect, createProyect);

router.put("/proyect/:id", authMiddleware,validateCreateProyect,verificarPermisos, updateProyect);

module.exports = router;
