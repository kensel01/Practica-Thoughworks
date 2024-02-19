const express = require("express")
const router = express.Router();
const pool = require("../db");
const {
  getAllproyect,
  getProyect,
  createProyect,
  updateProyect,
  ProyectByUser,
} = require("../controllers/proyect.controller");

const verificarPermisos = require("../middleware/permisos") 
const {validateCreateProyect}= require("../validators/valid.proyect")

// Authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

router.get("/proyects", authMiddleware, getAllproyect);

router.get("/proyects/:proyect_id", authMiddleware, getProyect);

router.get("/proyects/user/:id_usuario", authMiddleware, ProyectByUser);

router.post("/proyects", authMiddleware,validateCreateProyect, createProyect);

router.put("/proyects/:proyect_id", authMiddleware,verificarPermisos, updateProyect);

module.exports = router;
