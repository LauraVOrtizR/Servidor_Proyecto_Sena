const { Router } = require( 'express' ); // Traer el objeto Router de express
const router = Router(); // Guardar el metodo Router en la variable router
const productosController = require( '../controllers/productosController' ); // Traer el controlador de productos

router.post( '/productos' , productosController.create ); // Crear un producto

module.exports = router; // Exportar el router para que pueda ser utilizado en otros archivos