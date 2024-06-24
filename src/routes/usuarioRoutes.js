const { Router } = require('express');
const router = Router(); //routes
const usuariosController = require('../controllers/usuariosController');

router.get('/usuarios', usuariosController.getAllDocuments);
router.get('/usuarios/roles', usuariosController.getAllRoles);
router.get('/usuarios/permisos', usuariosController.getAllPermisions);
router.post('/usuarios/registro', usuariosController.register);
router.post('/usuarios/login', usuariosController.login);
router.post('/usuarios/perfiles/registro', usuariosController.register);
router.get('/usuarios/perfiles', usuariosController.getAllProfile);
router.put('/usuarios/perfiles', usuariosController.updatePerfil);
router.put('/usuarios/perfiles/eliminar', usuariosController.deletePerfil);
router.get('/usuarios/ajustes', usuariosController.getUser);
router.put('/usuarios/ajustes', usuariosController.updateUsuario);

module.exports = router;