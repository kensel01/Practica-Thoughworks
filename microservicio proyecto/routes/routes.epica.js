const { Router } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../db");
const {
  getAllepic,
  getEpic,
  createEpic,
  updateEpic,
} = require("../controllers/epica.controller");

router.get("/proyect/:id/epics", getAllepic);

router.get("/proyect/:id/epics/:id", getEpic);

router.post("/proyect/:id/epics", createEpic);

router.put("/proyect/:id/epics/:id", updateEpic);

module.exports = router;
