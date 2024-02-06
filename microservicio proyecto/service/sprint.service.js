const pool = require("../db");

const SprintService = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM sprint");
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM sprint WHERE sprint_id =$1",
      [id]
    );
    return result.rows[0];
  },

  createSprint: async (name, duration, dateStart, dateEnd) => {
    const resutl = await pool.query(
      "INSERT INTO sprint (sprint_name,duracion,date_start,date_end) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, duration, dateStart, dateEnd]
    );
    return resutl.rows[0];
  },

  updateSprint: async (id, name, duration, dateStart, dateEnd) => {
    const result = await pool.query(
      "UPDATE sprint  SET sprint_name =$1, duracion = $2, date_start =$3,date_end=$4 WHERE sprint_id = $5 RETURNING *",
      [id, name, duration, dateStart, dateEnd]
    );
    return result.rows[0];
  },
};
module.exports = SprintService;
