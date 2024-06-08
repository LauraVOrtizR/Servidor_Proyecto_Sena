const {Router} = require('express');
const router = Router(); //routes
const categoriasController = require('../controllers/categoriasController');

router.post('/categorias', categoriasController.createCategory); //Ruta para crear una categoria
router.get('/categorias', categoriasController.getCategory); //Ruta para obtener las categorias
router.put('/categorias/eliminar', categoriasController.deleteCategory); //Ruta para eliminar una categoria
router.put('/categorias', categoriasController.updateCategory); //Ruta para actualizar una categoria

module.exports = router;