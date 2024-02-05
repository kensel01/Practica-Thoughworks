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
// replicar para tareas spritns

router.get("/proyect/:proyectId/epics/:epicId/task", getAllTask);

router.get("/proyect/:proyectId/epics/:epicId/task/:id", getTask);

router.post("/proyect/:proyectId/epics/:epicId/task", createTask);

router.put("/proyect/:proyectId/epics/:epicId/task/:id", updateTask);

module.exports = router;
