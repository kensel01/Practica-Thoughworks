const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all
router.get("/proyectos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM proyectos");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one
router.get("/proyectos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM proyectos WHERE proyect_id = $1",
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post("/proyectos", async (req, res) => {
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
});

// PUT
router.put("/proyectos/:id", async (req, res) => {
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
});

// DELETE
router.delete("/proyectos/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM proyectos WHERE proyect_id = $1", [
      req.params.id,
    ]);
    res.json({ message: "Proyecto eliminado con éxito" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
