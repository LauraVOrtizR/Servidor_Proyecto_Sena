const { Router } = require('express');
const router = Router(); //routes
const usuariosController = require('../controllers/usuariosController');

router.post('/usuarios-registro', usuariosController.register);
router.post('/usuarios-login', usuariosController.login);
router.post('/usuarios/perfiles-registro', usuariosController.register);
router.put('/usuarios/perfiles', usuariosController.updatePerfil);
router.delete('/usuarios/perfiles', usuariosController.deletePerfil);
router.get('/usuarios/ajustes', usuariosController.getPerfil);

module.exports = router;