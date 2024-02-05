const pool = require('../db');

const permisosService = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM permisos');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM permisos WHERE permisos_id = $1', [id]);
    return result.rows[0];
  },

  create: async (epica, task, project, rol) => {
    const result = await pool.query(
      'INSERT INTO permisos (edit_epica, edit_task, edit_project, rol) VALUES ($1, $2, $3 , $4) RETURNING *',
      [epica, task, project, rol]
    );
    return result.rows[0];
  },

  update: async (epica, task, project, rol) => {
    const result = await pool.query(
      'UPDATE permisos SET edit_epica = $1, edit_task = $2, edit_project =$3 , rol= $4 WHERE permisos_id = $5 RETURNING *',
      [epica, task, project, rol]
    );
    return result.rows[0];
  }
};

module.exports = permisosService;
//admin(todo),colaborador (leer y escribir) y invitado(solo leer).leer tareas, sobre escribir tareas y crear y eleminar tareas.