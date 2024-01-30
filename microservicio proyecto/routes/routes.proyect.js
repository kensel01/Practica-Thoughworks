const { Router } = require("express");
const pool = require("../db");
const {
  getAllproyect,
  getProyect,
  createProyect,
  updateProyect,
} = require("../controllers/proyect.controller");

router.get("/proyect",getAllproyect);

router.get("/proyect/:id",getProyect);

router.post("/proyect",createProyect);

router.put("/proyect/:id",updateProyect);
module.exports = router;
