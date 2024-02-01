const ProyectosService = require('../service/proyecto.service');
const Proyectos = require('../models/proyecto.model');

const ProyectosController = {
  getAllproyect: async (req, res, next) => {
    try {
      const proyectosData = await ProyectosService.getAll();
      const proyectos = proyectosData.map(pd => new Proyectos(pd.id, pd.name, pd.description, pd.createby));
      res.json(proyectos);
    } catch (error) {
      next(error);
    }
  },

  getProyect: async (req, res, next) => {
    try {
      const proyectData = await ProyectosService.getById(req.params.id);
      if (!proyectData) {
        return res.status(404).json({ message: "Proyecto no encontrado" });
      }
      const proyecto = new Proyectos(proyectData.id, proyectData.name, proyectData.description, proyectData.createby);
      res.json(proyecto);
    } catch (error) {
      next(error);
    }
  },

  createProyect :async (req, res, next) => {
    try {
      const { name, description, createby } = req.body;
      const newProyect = await Proyectos.createProyect(
        name, description,createby
      );
      res.status(201).json(newProyect);
    } catch (error) {
      next(error);
    }
  },
  

  updateProyect: async (req, res, next) => {
    try {
      const id = req.params.id;
      const {name, description} = req.body;
      const updateProyect = await ProyectosService.updateProyect(id,name,description);
      if (!updateProyect){
        return res.status(404).json({ message: "Proyecto no encontrado" })
      }
      res.json(updateProyect);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = ProyectosController;