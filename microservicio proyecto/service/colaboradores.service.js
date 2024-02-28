const pool = require('../db');

const ColaboradoresService = {
  create: async (id_proyecto, id_usuario, cargo, permisos_id) => {
    const result = await pool.query(
      'INSERT INTO colaboradores (id_proyect, id_user, cargo, permisos_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_proyecto, id_usuario, cargo, permisos_id]
    );
    
    return result.rows[0];
  },
  getProyectByUser: async (id_usuario) => {
    const result = await pool.query(
      'SELECT p.* FROM Proyectos p JOIN Colaboradores c ON p.proyect_id = c.id_proyect WHERE c.id_user = $1',
      [id_usuario]
    );
    return result.rows;
  },
};

module.exports = ColaboradoresService;