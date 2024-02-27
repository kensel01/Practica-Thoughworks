const pool = require("../db");

const TareaService = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM tareas");
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query("SELECT * FROM tareas WHERE task_id =$1", [
      id,
    ]);
    return result.rows[0];
  },

  createTask: async (title, description, state, dateStart, dateEnd, epica_id) => {
    const resutl = await pool.query(
      "INSERT INTO tareas (task_title,task_description,task_state,date_start,date_end,epica_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [title, description, state, dateStart, dateEnd, epica_id]
    );
    return resutl.rows[0];
  },

  updateTask: async (id, title, description, state, dateStart, dateEnd) => {
    const result = await pool.query(
      "UPDATE tareas SET task_title =$1, task_description = $2, task_state =$3,date_start=$4,date_end= $5  WHERE task_id = $6 RETURNING *",
      [id, title, description, state, dateStart, dateEnd]
    );
    return result.rows[0];
  },
  getTasksByEpicId: async (epicId) => {
    const result = await pool.query("SELECT * FROM tareas WHERE epica_id = $1", [epicId]);
    return result.rows;
  },
};
module.exports = TareaService;
