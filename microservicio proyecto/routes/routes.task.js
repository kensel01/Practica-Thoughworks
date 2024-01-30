const { Router } = require("express");
const pool = require("../db");
const {
  getAlltask,
  getTask,
  createTask,
  updateTask,
} = require("../controllers/task.controller");

router.get("/proyect/:id/epics/:id/task", getAlltask);

router.get("/proyect/:id/epics/:id/task/:id", getTask);

router.post("/proyect/:id/epics/:id/task", createTask);

router.put("/proyect/:id/epics/:id/task/:id", updateTask);

module.exports = router;
