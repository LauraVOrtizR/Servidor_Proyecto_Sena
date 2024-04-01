const { Router } = require('express');
const router = Router(); //routes
const userController = require('../controllers/usuariosController');

router.post('/usuarios-registro', usuariosController.register);

module.exports = router;