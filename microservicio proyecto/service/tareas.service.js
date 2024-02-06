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

  createTask: async (title, description, state, dateStart, dateEnd) => {
    const resutl = await pool.query(
      "INSERT INTO tareas (task_title,task_description,task_state,date_start,date_end) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, description, state, dateStart, dateEnd]
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
};
module.exports = TareaService;
