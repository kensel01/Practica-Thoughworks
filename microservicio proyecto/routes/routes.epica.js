const {Router} = require("express")
const express = require("express")
const router = express.Router()
const pool = require("../db");
const {
  getAllepic,
  getEpic,
  createEpic,
  updateEpic,
} = require("../controllers/epica.controller");

router.get("/proyect/:id/epics");

router.get("/proyect/:id/epics/:id");

router.post("/proyect/:id/epics");

router.put("/proyect/:id/epics/:id");

module.exports = Router;
