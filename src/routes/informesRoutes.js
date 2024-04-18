const { Router } = require( 'express' );
const router = Router();
const informesController = require( '../controllers/informesController' );

router.post( '/informes/salidas-por-producto' , informesController.create );