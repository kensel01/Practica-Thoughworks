const express = require("express");
const router = express.Router();
const pool = require("../db");
const {
  getAllepic,
  getEpic,
  createEpic,
  updateEpic,
  getEpicsByProjectId
} = require("../controllers/epica.controller");
const verifyToken = require("../middleware/authMiddleware");

router.get("/proyect/:proyect_id/epics",verifyToken, getEpicsByProjectId);

router.get("/epics/:id",verifyToken, getEpic);

router.post("/proyect/:proyect_id/epics",verifyToken, createEpic);

router.put("/proyect/:proyect_id/epics/:id",verifyToken, updateEpic);

module.exports = router;
