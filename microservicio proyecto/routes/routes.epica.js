const express = require("express");
const router = express.Router();
const pool = require("../db");
const {
  getAllepic,
  getEpic,
  createEpic,
  updateEpic,
} = require("../controllers/epica.controller");

router.get("/proyect/:proyect_id/epics", getAllepic);

router.get("/proyect/:proyect_id/epics/:id", getEpic);

router.post("/proyect/:proyect_id/epics", createEpic);

router.put("/proyect/:pryect_id/epics/:id", updateEpic);

module.exports = router;
//prueba