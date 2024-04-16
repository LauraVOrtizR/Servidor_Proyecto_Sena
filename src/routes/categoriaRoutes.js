const {Router} = require('express');
const router = Router(); //routes
const categoriasController = require('../controllers/categoriasController');

router.post('/categorias', categoriasController.create);
router.get('/categorias', categoriasController.getCategoria);

module.exports = router;