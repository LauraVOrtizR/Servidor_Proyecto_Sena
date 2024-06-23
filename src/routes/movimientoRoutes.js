const { Router } = require('express');
const router = Router();
const movimientosController = require('../controllers/movimientosController');

router.get('/entradas_salidas', movimientosController.getOperations);
router.post('/entradas', movimientosController.createEntry);
router.post('/salidas', movimientosController.createExit);

module.exports = router;