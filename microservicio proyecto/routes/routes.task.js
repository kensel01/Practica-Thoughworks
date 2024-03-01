const express = require("express")
const router = express.Router();
const pool = require("../db");
const {
  getAllTask,
  getTask,
  createTask,
  updateTask,
  getTasksByEpicId,
  getTasksByUserId,
  updateTaskState
} = require("../controllers/task.controller");
const verifyToken = require("../middleware/authMiddleware");

router.get("/proyect/:proyectId/epics/:epicId/task",verifyToken, getTasksByEpicId);
router.get("/proyect/:proyectId/sprint/:sprint_Id/task",verifyToken, getAllTask);

router.get("/proyect/:proyectId/epics/:epicId/task/:id",verifyToken, getTask);
router.get("/proyect/:proyectId/sprint/:sprint_Id/task/:id",verifyToken, getTask);

router.post("/proyect/:proyectId/epics/:epicId/task",verifyToken, createTask);
router.post("/proyect/:proyectId/sprint/:sprint_Id/task",verifyToken, createTask);

router.put("/proyect/:proyectId/epics/:epicId/task/:id",verifyToken, updateTaskState);
router.put("/proyect/:proyectId/sprint/:sprint_Id/task/:id",verifyToken, updateTask);

router.get("/user/:userId/tasks", verifyToken, getTasksByUserId);

module.exports = router;
