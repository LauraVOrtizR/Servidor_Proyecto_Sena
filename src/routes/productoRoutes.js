const { Router } = require( 'express' ); // Traer el objeto Router de express
const router = Router(); // Guardar el metodo Router en la variable router
const productosController = require( '../controllers/productosController' ); // Traer el controlador de productos

router.post( '/productos' , productosController.create ); // Crear un producto
router.get( '/productos' , productosController.read ); // Leer todos los productos
router.put( '/productos-eliminar' , productosController.delete ); // Eliminar un producto
router.get( '/productos/detalles' , productosController.readDetails ); // Leer los detalles de un producto
router.put( '/productos' , productosController.update ); // Actualizar un producto

module.exports = router; // Exportar el router para que pueda ser utilizado en otros archivos