const ProyectoService = require('../service/proyecto.service');
const Proyecto= require('../models/proyecto.model');

const ProyectosController = {
  getAllproyect: async (req, res, next) => {
    try {
      const proyectosData = await ProyectoService.getAll();
      const proyectos = proyectosData.map(pd => new Proyecto(pd.id, pd.name, pd.description, pd.createby));
      res.json(proyectos);
    } catch (error) {
      next(error);
    }
  },

  getProyect: async (req, res, next) => {
    try {
      const proyectData = await ProyectoService.getById(req.params.id);
      if (!proyectData) {
        return res.status(404).json({ message: "Proyecto no encontrado" });
      }
      const proyecto = new Proyecto(proyectData.id, proyectData.name, proyectData.description, proyectData.createby);
      res.json(proyecto);
    } catch (error) {
      next(error);
    }
  },

  createProyect: async (req, res, next) => {
    try {
      const { name, description, createby } = req.body;
      const proyectData = await ProyectoService.create(name, description, createby);
      const newProyect = new Proyecto(proyectData.id, proyectData.name, proyectData.description, proyectData.createby);
      res.status(201).json(newProyect);
    } catch (error) {
      next(error);
    }
  },

  updateProyect: async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const proyectData = await ProyectoService.update(req.params.id, name, description);
      if (!proyectData) {
        return res.status(404).json({ message: "Proyecto no encontrado" });
      }
      const updatedProyect = new Proyecto(proyectData.id, proyectData.name, proyectData.description, proyectData.createby);
      res.json(updatedProyect);
    } catch (error) {
      next(error);
    }
  }
};


module.exports = ProyectosController;