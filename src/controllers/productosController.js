const Producto = require( '../models/productos' ); // Traer el modelo de productos
module.exports = {
    create( req, res ) {
        const producto = req.body; // Datos del producto
        Producto.create( producto, ( err, data ) => {
            if( err ) {
                res.status( 501 ).json({
                    success: false,
                    message: 'Error al crear el producto',
                    error: err
                });
            }
            return res.status( 201 ).json({
                success: true,
                message: res.message,
                data: data // Id del producto creado
            });
        });
    },

    read( req, res ) {
        console.log( 'Estoy ingresando al controlador.');
        Producto.read(( err, data ) => {
            if( err ) {
                res.status( 501 ).json({
                    success: false,
                    message: 'Error al leer los productos',
                    error: err
                });
            }
            return res.status( 200 ).json({
                success: true,
                message: res.message,
                data: data // Datos de los productos
            });
        });
    },

    delete( req, res ) {
        const producto = req.body; // Datos del producto
        console.log( 'Eliminando producto con id: ', producto.id_producto);
        Producto.delete( producto, ( err, data ) => {
            if( err ) {
                res.status( 501 ).json({
                    success: false,
                    message: 'Error al eliminar el producto',
                    error: err
                });
            }
            return res.status( 200 ).json({
                success: true,
                message: res.message,
                data: data // Id del producto eliminado
            });
        });
    },

    readDetails ( req, res ) {
        const producto = req.body; // Datos del producto
        console.log( 'Leyendo detalles del producto con id: ', producto.id_producto);
        Producto.readDetails( producto, ( err, data ) => {
            if( err ) {
                res.status( 501 ).json({
                    success: false,
                    message: 'Error al leer los detalles del producto',
                    error: err
                });
            }
            return res.status( 200 ).json({
                success: true,
                message: res.message,
                data: data // Datos del producto
            });
        });
    },

    
};



