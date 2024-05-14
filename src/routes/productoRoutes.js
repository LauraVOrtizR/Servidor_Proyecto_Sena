const { Router } = require( 'express' ); // Traer el objeto Router de express
const router = Router(); // Guardar el metodo Router en la variable router
const productosController = require( '../controllers/productosController' ); // Traer el controlador de productos

router.post( '/productos' , productosController.create ); // Crear un producto
router.get( '/productos' , productosController.getAllProduct ); // Mostrar todos los productos
router.put( '/productos/eliminar' , productosController.delete ); // Eliminar un producto
router.get( '/productos/detalles' , productosController.getDetails ); // Mostrar los detalles de un producto
router.put( '/productos' , productosController.updateDetails ); // Actualizar un producto
router.get( '/productos/movimientos' , productosController.getTransactions ); // Mostrar los movimientos de un producto
router.get( '/productos/abastecimiento' , productosController.getProvision ); // Mostrar los productos que necesitan abastecimiento

module.exports = router; // Exportar el router para que pueda ser utilizado en otros archivos