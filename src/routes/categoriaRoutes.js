const {Router} = require('express');
const router = Router(); //routes
const categoriasController = require('../controllers/categoriasController');

router.post('/categorias', categoriasController.create);
router.get('/categorias', categoriasController.getCategoria);
router.put('/categorias-eliminar', categoriasController.deleteCategoria);
router.put('/categorias', categoriasController.updateCategoria);

module.exports = router;