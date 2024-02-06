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

router.get("/proyect/:proyectId/epics/:epicId/task", getAllTask);
router.get("/proyect/:proyectId/sprint/:sprint_Id/task", getAllTask);

router.get("/proyect/:proyectId/epics/:epicId/task/:id", getTask);
router.get("/proyect/:proyectId/sprint/:sprint_Id/task/:id", getTask);

router.post("/proyect/:proyectId/epics/:epicId/task", createTask);
router.post("/proyect/:proyectId/sprint/:sprint_Id/task", createTask);

router.put("/proyect/:proyectId/epics/:epicId/task/:id", updateTask);
router.put("/proyect/:proyectId/sprint/:sprint_Id/task/:id", updateTask);

module.exports = router;
