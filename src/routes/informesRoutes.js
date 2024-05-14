const { Router } = require( 'express' );
const router = Router();
const informesController = require( '../controllers/informesController' );

router.get( '/informes/salidasporproducto' , informesController.getSalesByProduct ); // Ruta para obtener las salidas por producto
router.get( '/informes/salidascategoria' , informesController.getTopSalesByCategory ); // Ruta para obtener las salidas por categoria
router.get( '/informe/salidasporalmacen' , informesController.getSalesByStore ); 

module.exports = router;