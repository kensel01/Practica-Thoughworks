const { json } = require("express");
const pool = require("../db");

const getAllepics = async (req, res, next) => {
  try {
    const allEpics = await pool.query("SELECT * FROM epica");
    res.json(allEpics.rows);
  } catch (error) {
    next(error);
  }
};

const getEpic = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM epica WHERE epica_id =$1", [
      req.params.id,
    ]);
    res, json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createEpic = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO epica(title, description) VALUES ($1, $2) RETURNING *",
      [req.body.title, req.body.descripcion]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.constraint === "proyectos_nombre_key") {
      res.status(400).json({ error: "El nombre de la epica ya existe" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

const updateEpic = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE proyectos SET title= $1, description = $2 WHERE epica_id = $3 RETURNING *",
      [req.body.title, req.body.descripcion, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.constraint === "proyectos_nombre_key") {
      res.status(400).json({ error: "El nombre de la epica  ya existe" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports={
    getAllepics,
    getEpic,
    createEpic,
    updateEpic
};