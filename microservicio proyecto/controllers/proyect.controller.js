const ProyectoService = require('../service/proyecto.service');
const Proyecto = require('../models/proyecto.model');
const ColaboradoresService = require('../service/colaboradores.service');



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
      const proyectData = await ProyectoService.getById(req.params.proyect_id);
      if (!proyectData) {
        return res.status(404).json({ message: "Proyecto no encontrado" });
      }
      const proyecto = new Proyecto(proyectData.id, proyectData.name, proyectData.description, proyectData.createby);
      res.json(proyectData);
    } catch (error) {
      next(error);
    }
  },

  createProyect: async (req, res, next) => {
    try {
      const { name, description, createby } = req.body;
      const proyectData = await ProyectoService.create(name, description, createby);
      console.log(proyectData)
      const newProyect = new Proyecto(proyectData.proyect_id, proyectData.name_proyect, proyectData.proyect_description, proyectData.create_by);
      const colaboradores = req.body.colaboradores; 
      console.log(colaboradores)
      for (const col of colaboradores) {
        await ColaboradoresService.create(newProyect.id, col, "Invitado", 2);
      }

      await ColaboradoresService.create(newProyect.id, newProyect.createby, "Admin", 1);
      
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
  },
  ProyectByUser: async (req, res, next) => {
    try {
      const proyectosData = await ColaboradoresService.getProyectByUser(req.params.id_usuario);
      if (!proyectosData || proyectosData.length === 0) {
        return res.json([]); 
      }
      res.json(proyectosData);
      
    } catch (error) {
      next(error);
    }
  }
};


module.exports = ProyectosController;