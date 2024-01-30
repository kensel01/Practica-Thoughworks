const { json } = require("express");
const pool = require("../db");

const getAllproyect = async (req, res, next) => {
  try {
    const allProyect = await pool.query("SELECT * FROM proyectos");
    res.json(allProyect.rows);
  } catch (error) {
    next(error);
  }
};

const getProyect = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM proyectos WHERE proyect_id = $1",
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProyect = async (req, res, next) => {
  try {
    const result = await pool.query(
      "INSERT INTO proyectos (name_proyect, proyect_description, create_by) VALUES ($1, $2,$3) RETURNING *",
      [req.body.nombre, req.body.descripcion, req.body.createby]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.constraint === "proyectos_nombre_key") {
      res.status(400).json({ error: "El nombre del proyecto ya existe" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

const updateProyect = async (req, res, next) => {
  try {
    const result = await pool.query(
      "UPDATE proyectos SET name_proyect = $1, proyect_description = $2 WHERE proyect_id = $3 RETURNING *",
      [req.body.nombre, req.body.descripcion, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.constraint === "proyectos_nombre_key") {
      res.status(400).json({ error: "El nombre del proyecto ya existe" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};
module.exports = {
  getAllproyect,
  getProyect,
  createProyect,
  updateProyect,
};
