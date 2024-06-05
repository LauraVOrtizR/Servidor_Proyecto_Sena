const { Router } = require('express');
const router = Router();
const almacenController = require('../controllers/almacenController');
    
router.post('/almacenes', almacenController.create); //Ruta para crear un almacen
router.post('/almacenes/asignar', almacenController.asignAlmacen); //Ruta para asignar un almacen a un usuario
router.get('/almacenes', almacenController.getById); //Ruta para obtener un almacen por id del alamacen
router.get('/almacenes/usuario', almacenController.getByUser); //Ruta para obtener los almacenes por id del usuario
router.put('/almacenes', almacenController.deleteAlmacen); //Ruta para eliminar un almacen
router.put('/almacenes/editar', almacenController.updateAlmacen); //Ruta para editar un almacen

module.exports = router;