const { Router } = require('express');
const router = Router();
const movimientosController = require('../controllers/movimientosController');

router.get('/entradasysalidas', movimientosController.getEntradasSalidas);
router.post('/entradas', movimientosController.createEntrada);
router.post('/salidas', movimientosController.createSalida);

module.exports = router;