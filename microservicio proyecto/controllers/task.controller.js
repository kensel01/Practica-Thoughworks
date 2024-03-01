const TareaService = require("../service/tareas.service");
const Tareas = require("../models/tareas.model");

const TareasController = {
  getAllTask: async (req, res, next) => {
    try {
      const taskData = await TareaService.getAll();
      const tareas = taskData.map(
        (pd) =>
          new Sprint(pd.id, pd.title, pd.description, pd.state, pd.dateStart, pd.dateEnd)
      );
      res.json(tareasData);
    } catch (error) {
      next(error);
    }
  },

  getTask: async (req, res, next) => {
    try {
      const taskData = await TareaService.getById(req.params.id);
      if (!taskData) {
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
      res.json(taskData);
    } catch (error) {
      next(error);
    }
  },
  createTask: async (req, res, next) => {
    try {
      const { title, description, state, dateStart, dateEnd, epica_id } = req.body;
      const userId = req.user.user_id; 
      const taskData = await TareaService.createTask(
        title,
        description,
        state,
        dateStart,
        dateEnd,
        epica_id,
        userId 
      );
      const newTask = new Tareas(
        taskData.title,
        taskData.description,
        taskData.state,
        taskData.dateStart,
        taskData.dateEnd,
        taskData.epica_id
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
  updateTaskState: async (req, res, next) => {
    try {
      const { state } = req.body;
      const taskData = await TareaService.updateTaskState(req.params.id, state);
      if (!taskData) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      res.json({ message: "Estado de la tarea actualizado correctamente" });
    } catch (error) {
      next(error);
    }
  },
  getTasksByEpicId: async (req, res, next) => {
    try {
      const epicId = req.params.epicId;
      const taskData = await TareaService.getTasksByEpicId(epicId);
      if (taskData.length === 0) {
        return res.status(404).json({ message: "No se encontraron tareas para la épica especificada" });
      }
      const tasks = taskData.map(task => new Tareas(
        task.id,
        task.title,
        task.description,
        task.state,
        task.dateStart,
        task.dateEnd
      ));
      res.json(taskData);
    } catch (error) {
      next(error);
    }
  },
  getTasksByUserId: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const taskData = await TareaService.getTasksByUserId(userId);
      if (taskData.length === 0) {
        return res.status(404).json({ message: "No se encontraron tareas para el usuario especificado" });
      }
      const tasks = taskData.map(task => new Tareas(
        task.id,
        task.title,
        task.description,
        task.state,
        task.dateStart,
        task.dateEnd
      ));
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },
  
};

module.exports = TareasController;
