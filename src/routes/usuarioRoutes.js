const { Router } = require('express');
const router = Router(); //routes
const usuariosController = require('../controllers/usuariosController');

router.post('/usuarios/registro', usuariosController.register); //
router.post('/usuarios/login', usuariosController.login);
router.post('/usuarios/perfiles/registro', usuariosController.register);
router.get('/usuarios/perfiles', usuariosController.getAllPerfil);
router.put('/usuarios/perfiles', usuariosController.updatePerfil);
router.put('/usuarios/perfiles/eliminar', usuariosController.deletePerfil);
router.get('/usuarios/ajustes', usuariosController.getUsuario);
router.put('/usuarios/ajustes', usuariosController.updateUsuario);

module.exports = router;