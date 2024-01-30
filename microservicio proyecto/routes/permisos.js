const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT permisos FROM usuarios WHERE id = $1', [userId]);
        res.json(result.rows[0].permisos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al verificar los permisos' });
    } finally {
        client.release();
    }
});
    

module.exports = router;
