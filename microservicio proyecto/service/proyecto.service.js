const pool = require('../db');

const ProyectosService = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM Proyectos');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM Proyectos WHERE proyect_id = $1', [id]);
    return result.rows[0];
  },

  create: async (nombre, descripcion, createby) => {
    const result = await pool.query(
      'INSERT INTO Proyectos (name_proyect, proyect_description, create_by) VALUES ($1, $2, $3) RETURNING ',
      [nombre, descripcion, createby]
    );
    return result.rows[0];
  },

  update: async (id, nombre, descripcion) => {
    const result = await pool.query(
      'UPDATE Proyectos SET name_proyect = $1, proyect_description = $2 WHERE proyect_id = $3 RETURNING',
      [nombre, descripcion, id]
    );
    return result.rows[0];
  }
};

module.exports = ProyectosService;