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

  createTask: async (title, description, state, dateStart, dateEnd, epica_id, user_id) => {
    const result = await pool.query(
      "INSERT INTO tareas (task_title,task_description,task_state,date_start,date_end,epica_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [title, description, state, dateStart, dateEnd, epica_id]
    );
    if (result.rows.length > 0) {
      const taskId = result.rows[0].task_id;
      await pool.query(
        "INSERT INTO usuario_tarea (user_id, task_id) VALUES ($1, $2)",
        [user_id, taskId] 
      );
    }
    return result.rows[0];
  },
  updateTask: async (id, title, description, state, dateStart, dateEnd) => {
    const result = await pool.query(
      "UPDATE tareas SET task_title =$1, task_description = $2, task_state =$3,date_start=$4,date_end= $5  WHERE task_id = $6 RETURNING *",
      [id, title, description, state, dateStart, dateEnd]
    );
    return result.rows[0];
  },
  updateTaskState: async (id, state) => {
    const result = await pool.query(
      "UPDATE tareas SET task_state = $2 WHERE task_id = $1 RETURNING *",
      [id, state]
    );
    return result.rows[0];
  },
  getTasksByEpicId: async (epicId) => {
    const result = await pool.query("SELECT * FROM tareas WHERE epica_id = $1", [epicId]);
    return result.rows;
  },
  getTasksByUserId: async (userId) => {
    const result = await pool.query(
      "SELECT t.* FROM tareas t JOIN usuario_tarea ut ON t.task_id = ut.task_id WHERE ut.user_id = $1",
      [userId]
    );
    return result.rows;
  },
  updateTaskParticipants: async (taskId, participants) => {
  
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM usuario_tarea WHERE task_id = $1', [taskId]);
      for (const userId of participants) {
        await client.query('INSERT INTO usuario_tarea (user_id, task_id) VALUES ($1, $2)', [userId, taskId]);
      }
      await client.query('COMMIT');
      return { message: "Participantes actualizados correctamente", taskId: taskId, participants: participants };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};
module.exports = TareaService;
