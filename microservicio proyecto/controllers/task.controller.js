const Tareas = require("../service/tareas.service");

const getAlltask = async (req, res, next) => {
  try {
    const allTask = await Tareas.getAll;
    res.json(allEpic);
  } catch (error) {
    next(error);
  }
};
const getTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const taskbyid = await Tareas.getByid(id);
    if (!taskbyid) {
      return res.status(404).json({ message: "tarea no encontrada" });
    }
    res.json(taskbyid);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, state, dateStart, dateEnd } = req.body;
    const newTask = await Tareas.createTask(
      title,
      description,
      state,
      dateStart,
      dateEnd
    );
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, description, state, dateStart, dateEnd } = req.body;
    const updateTask = await Tareas.updateTask(
      id,
      title,
      description,
      state,
      dateStart,
      dateEnd
    );
    if (!updateTask) {
      return res.status(404).json({ message: "Epcia no encontrada" });
    }
    res.json(updateTask);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlltask,
  getTask,
  createTask,
  updateTask,
};
