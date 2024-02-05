const permisosService = require('../service/permisos.service');
const Permiso = require('../models/permisos.model');

const PermisosController = {
  getAllpermisos: async (req, res, next) => {
    try {
      const permisosData = await permisosService.getAll();
      const permisos = permisosData.map(pd => new Permiso(pd.id, pd.edit_epica, pd.edit_task, pd.edit_project, pd.rol));
      res.json(permisos);
    } catch (error) {
      next(error);
    }
  },

  getPermisos: async (req, res, next) => {
    try {
      const permisosData = await permisosService.getById(req.params.id);
      if (!permisosData) {
        return res.status(404).json({ message: "Permisos no encontrado" });
      }
      const permisos = new Permiso(permisosData.id, permisosData.edit_epica, permisosData.edit_task, permisosData.edit_project, permisosData.rol);
      res.json(permisos);
    } catch (error) {
      next(error);
    }
  },

  createPermisos: async (req, res, next) => {
    try {
      const {edit_epica, edit_task, edit_project,rol} = req.body;
      const permisosData = await permisosService.create(edit_epica,edit_task,edit_project,rol);
      const newPermiso = new Permiso(permisosData.id,permisosData.edit_epica, permisosData.edit_task, permisosData.edit_project,permisosData.rol);
      res.status(201).json(newPermiso);
    } catch (error) {
      next(error);
    }
  },

  updatePermisos: async (req, res, next) => {
    try {
      const {edit_epica, edit_task, edit_project,rol} = req.body;
      const permisosData =  await permisosService.updatePermisos(req.params.id,edit_epica,edit_task,edit_project,rol);
      if (!permisosData){
        return res.status(404).json({ message: "Permisos no encontrado" })
      }
      const updatePermisos = new Permiso(permisosData.id, permisosData.edit_epica, permisosData.edit_task, permisosData.edit_project,permisosData.rol);
      res.json(updatePermisos);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = PermisosController;