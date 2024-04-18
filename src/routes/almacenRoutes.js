const { Router } = require('express');
const router = Router();
const almacenController = require('../controllers/almacenController');
    
router.post('/almacenes', almacenController.create);
router.get('/almacenes', almacenController.getById);


module.exports = router;