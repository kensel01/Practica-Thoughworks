const pool = require("../db");

const EpicaService = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM epica");
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query("SELECT * FROM epica WHERE epica_id =$1", [
      id,
    ]);
    return result.rows[0];
  },

  createEpic: async (title, description) => {
    const resutl = await pool.query(
      "INSERT INTO epica (title, description) VALUES ($1,$2) RETURNING *",
      [title, description]
    );
    return resutl.rows[0];
  },

  updateEpic: async (id, title, description) => {
    const result = await pool.query(
      "UPDATE epica  SET title =$1, description = $2 WHERE epica_id = $3 RETURNING *",
      [id, title, description]
    );
    return result.rows[0];
  },
};
module.exports = EpicaService;
