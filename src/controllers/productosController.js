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

    getAllProduct( req, res ) {
        console.log( 'Estoy ingresando al controlador.');
        Producto.getAllProduct(( err, data ) => {
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

    getDetails ( req, res ) {
        const id_producto = req.query.id_producto || null; // Id del producto
        if( !id_producto ) {
            return res.status( 400 ).json({
                success: false,
                message: 'El id del producto es requerido'
            });
        }
        const producto = {
            id_producto: id_producto
        };

        Producto.getDetails ( producto, ( err, data ) => {
            if( err ) {
                res.status( 501 ).json({
                    success: false,
                    message: 'Error al leer los detalles del producto',
                    error: err
                });
            }
            
            if( data.length == 0 ){
                res.status(200).json({
                    success: false,
                    message: 'Producto no encontrado',
                });
            }

            return res.status( 200 ).json({
                success: true,
                message: res.message,
                data: data
            });
        });
    },

    updateDetails ( req, res ) {
        const producto = req.body; // Datos del producto
        Producto.updateDetails( producto, ( err, data ) => {
            if( err ) {
                res.status( 501 ).json({
                    success: false,
                    message: 'Error al actualizar los detalles del producto',
                    error: err
                });
            }
            return res.status( 200 ).json({
                success: true,
                message: res.message,
                data: data // Datos del producto actualizado
            });
        });
    },

    getTransactions ( req, res ) {
        console.log( 'id_producto:' , req.query.id_producto);
        const id_producto = req.query.id_producto || null; // Id del producto
        if( !id_producto ) {
            return res.status( 400 ).json({
                success: false,
                message: 'El id del producto es requerido'
            });
        }
        const producto = {
            id_producto: id_producto
        };

        Producto.getTransactions ( producto, ( err, data ) => {
            if( err ) {
                res.status( 501 ).json({
                    success: false,
                    message: 'Error al leer los movimientos del producto',
                    error: err
                });
            }
            
            if( data.length == 0 ){
                res.status(200).json({
                    success: false,
                    message: 'Producto no encontrado',
                });
            }

            return res.status( 200 ).json({
                success: true,
                message: res.message,
                data: data
            });
        });
    },

    getProvision ( req, res ) {
        Producto.getProvision(( err, data ) => {
            if( err ) {
                res.status( 501 ).json({
                    success: false,
                    error: err
                });
            }
            return res.status( 200 ).json({
                success: true,
                message: res.message,
                data: data // Datos de los productos que necesitan abastecimiento
            });
        });
    }

};