const { Router } = require('express');
const router = Router(); //routes
const usuariosController = require('../controllers/usuariosController');

router.post('/usuarios-registro', usuariosController.register);

module.exports = router;