const TareaService = require("../service/tareas.service");
const Tareas = require("../models/tareas.model");

const TareasController = {
  getAllTask: async (req, res, next) => {
    try {
      const taskData = await TareaService.getAll();
      const tareas = taskData.map(
        (pd) =>
          new Sprint(pd.id, pd.title, pd.description,pd.state, pd.dateStart, pd.dateEnd)
      );
      res.json(tareas);
    } catch (error) {
      next(error);
    }
  },

  getTask: async (req, res, next) => {
    try {
      const taskData = await TareaService.getById(req.params.id);
      if ( taskData) {
        return res.status(404).json({ message: "Tarea  no encontrada" });
      }
      const tarea = new Tareas(
       taskData.id,
       taskData.title,
       taskData.description,
       taskData.state,
       taskData.dateStart,
       taskData.dateEnd
      );
      res.json(tarea);
    } catch (error) {
      next(error);
    }
  },
  createTask: async (req, res, next) => {
    try {
      const { title, description, state, dateStart, dateEnd } = req.body;
      const taskData = await TareaService.createTask(
        title,
        description,
        state,
        dateStart,
        dateEnd
      );
      const newTask = new Tareas(
        taskData.title,
        taskData.description,
        taskData.state,
        taskData.dateStart,
        taskData.dateEnd
      );

      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req, res, next) => {
    try {
      const { title, description, state, dateStart, dateEnd } = req.body;
      const taskData = await TareaService.updateTask(
        req.params.id,
        title,
        description,
        state,
        dateStart,
        dateEnd
      );
      if (!taskData) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      const updatetask = new Tareas(
        taskData.id,
        taskData.title,
        taskData.description,
        taskData.state,
        taskData.dateStart,
        taskData.dateEnd
      );
      res.json(updatetask);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = TareasController;
