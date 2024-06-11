const { Router } = require( 'express' ); // Traer el objeto Router de express
const router = Router(); // Guardar el metodo Router en la variable router
const productosController = require( '../controllers/productosController' ); // Traer el controlador de productos

router.post( '/productos' , productosController.createProduct ); // Crear un producto
router.get( '/productos/almacen' , productosController.getAllProductAlmacen ); // Mostrar todos los productos por almacen
router.get( '/productos' , productosController.getAllProduct ); // Mostrar todos los productos 
router.put( '/productos/eliminar' , productosController.deleteProduct ); // Eliminar un producto
router.get( '/productos/detalles' , productosController.getDetailsProduct ); // Mostrar los detalles de un producto
router.put( '/productos' , productosController.updateDetailsProduct ); // Actualizar un producto
router.get( '/productos/movimientos' , productosController.getTransactionsProduct ); // Mostrar los movimientos de un producto
router.get( '/productos/abastecimiento' , productosController.getProvisionProduct ); // Mostrar los productos que necesitan abastecimiento 

module.exports = router; // Exportar el router para que pueda ser utilizado en otros archivos