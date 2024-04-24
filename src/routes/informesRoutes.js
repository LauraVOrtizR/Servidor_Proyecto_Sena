const { Router } = require( 'express' );
const router = Router();
const informesController = require( '../controllers/informesController' );

router.get( '/informes/salidas-por-producto' , informesController.getSalesByProduct ); // Ruta para obtener las salidas por producto
router.get( '/informes/salidas-categoria' , informesController.getTopSalesByCategory ); // Ruta para obtener las salidas por categoria
router.get( '/informe/salidas-por-almacen' , informesController.getSalesByStore ); 

module.exports = router;