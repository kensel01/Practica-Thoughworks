const pool = require("../db");

const getAlltask = async (req, res, next) => {
  try {
    const alltask = await pool.query("SELECT * FROM tareas");
    res.json(alltask.rows);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM tareas WHERE task_id=$1", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {}
};

const createTask = async (req, res, next) => {
  try {
    const createtask = await pool.query(
      "INSERT INTO tareas (task_title, task_description, task_state, date_start, date_end)VALUES($1,$2,$3,$4,$5) RETURNING *",
      [
        req.body.title,
        req.body.description,
        req.body.state,
        req.body.date_start,
        req.body.date_end,
      ]
    );
    res.json(createtask.rows[0]);
  } catch (error) {
    if (err.constraint === "proyectos_nombre_key") {
      res.status(400).json({ error: "El nombre de la tarea ya existe" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

const updateTask = async (req, res, next) => {
  try {
    const resutl = await pool.query(
      "UPDATE tareas SET task_title=$1, task_description=$2, task_state=$3, date_start=$4, date_end=$5 WHERE task_id =$6 RETURNING*",
      [
        req.body.title,
        req.body.description,
        req.body.state,
        req.body.date_start,
        req.body.date_end,
        req.params.id,
      ]
    );
  } catch (error) {
    if (err.constraint === "proyectos_nombre_key") {
      res.status(400).json({ error: "El nombre del proyecto ya existe" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = {
  getAlltask,
  getTask,
  createTask,
  updateTask,
};
