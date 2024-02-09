const permisosService = require('../service/permisos.service');

async function verificarPermisos(req, res, next) {
  const userId = req.user.id; // Asegúrate de tener el id del usuario disponible aquí, posiblemente a través de un middleware de autenticación previo
  const { proyectId } = req.params;

  try {
    const permisos = await permisosService.obtenerPermisosPorUsuarioYProyecto(userId, proyectId);

    if (!permisos) {
      return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
    }

    // Aquí deberías verificar el permiso específico según la acción que se intenta realizar
    // Por ejemplo, si es una edición de proyecto:
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