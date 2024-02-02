const { Router } = require("express");
const express = require("express")
const router = express.Router();
const pool = require("../db");
const {
  getAllTask,
  getTask,
  createTask,
  updateTask,
} = require("../controllers/task.controller");

router.get("/proyect/:id/epics/:id/task", getAllTask);

router.get("/proyect/:id/epics/:id/task/:id", getTask);

router.post("/proyect/:id/epics/:id/task", createTask);

router.put("/proyect/:id/epics/:id/task/:id", updateTask);

module.exports = router;
