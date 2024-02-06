const pool = require('../db');

const ColaboradoresService = {
  create: async (id_proyecto, id_usuario, cargo, permisos_id) => {
    const result = await pool.query(
      'INSERT INTO colaboradores (id_proyecto, id_usuario, cargo, permisos_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_proyecto, id_usuario, cargo, permisos_id]
    );
    return result.rows[0];
  },
};

module.exports = ColaboradoresService;