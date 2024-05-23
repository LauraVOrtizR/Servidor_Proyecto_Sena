const { Router } = require('express');
const router = Router(); //routes
const usuariosController = require('../controllers/usuariosController');

router.post('/usuarios/registro', usuariosController.register); // Ruta para registrar un usuario
router.post('/usuarios/login', usuariosController.login); // Ruta para el login de un usuario
router.post('/usuarios/perfiles/registro', usuariosController.register); // Ruta para registrar un perfil
router.get('/usuarios/perfiles', usuariosController.getAllPerfil); 
router.put('/usuarios/perfiles', usuariosController.updatePerfil); // Ruta para actualizar un perfil
router.put('/usuarios/perfiles/eliminar', usuariosController.deletePerfil); // Ruta para eliminar un perfil
router.get('/usuarios/ajustes', usuariosController.getUsuario); //Ruta para obtener la información de un usuario
router.put('/usuarios/ajustes', usuariosController.updateUsuario); // Ruta para actualizar la información de un usuario

module.exports = router;