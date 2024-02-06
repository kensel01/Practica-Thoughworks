const express = require("express");
const router = express.Router();
const pool = require("../db");
const {
  getAllsprint,
  getSprint,
  createSprint,
  updateSprint,
} = require("../controllers/sprint.controller");

router.get("/sprint", getAllsprint);

router.get("/sprint/:id", getSprint);

router.post("/sprint", createSprint);

router.put("/sprint/:id", updateSprint);
module.exports = router;
