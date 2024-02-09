const pool = require('../db');

const permisosService = {
  async obtenerPermisosPorUsuarioYProyecto(userId, projectId) {
    const colaborador = await pool.query(
      "SELECT permisos_id FROM Colaboradores WHERE id_user = $1 AND id_proyect = $2",
      [userId, projectId]
    );

    if (colaborador.rowCount === 0) {
      return null;
    }

    const permisosId = colaborador.rows[0].permisos_id;
    const permisos = await pool.query(
      "SELECT * FROM permisos WHERE permisos_id = $1",
      [permisosId]
    );

    return permisos.rows[0];
  }
};

module.exports = permisosService;