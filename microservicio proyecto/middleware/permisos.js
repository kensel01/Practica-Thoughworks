const permisosService = require('../service/permisos.service');

async function verificarPermisos(req, res, next) {
  const userId = req.user.id; 
  const { proyectId } = req.params;

  try {
    const permisos = await permisosService.obtenerPermisosPorUsuarioYProyecto(userId, proyectId);

    if (!permisos) {
      return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
    }

    if (!permisos.edit_project) {
      return res.status(403).json({ message: "No tienes permisos para editar proyectos." });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al verificar permisos." });
  }
}

module.exports = verificarPermisos;