const { Router } = require( 'express' );
const router = Router();
const informesController = require( '../controllers/informesController' );

router.get( '/informes/salidas' , informesController.mostrar );

module.exports = router;