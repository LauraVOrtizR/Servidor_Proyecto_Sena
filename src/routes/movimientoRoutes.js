const { Router } = require('express');
const router = Router();
const movimientosController = require('../controllers/movimientosController');

router.get('/entradas-salidas', movimientosController.getEntradasSalidas);

module.exports = router;