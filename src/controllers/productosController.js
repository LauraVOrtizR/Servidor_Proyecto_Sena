const Producto = require( '../models/productos' ); // Traer el modelo de productos

module.exports = {
    createProduct( req, res ) {
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

    getAllProductAlmacen( req, res ) {
        const id_almacen = req.query
        if(!id_almacen){
            return res.status(400).json({
                success: false,
                message: 'Falta el id del almacen' 
            });
        }; 
        Producto.getAllProductByStore(id_almacen,( err, data ) => {
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

    deleteProduct( req, res ) {
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

    getDetailsProduct ( req, res ) {
        const id_producto = req.query.id_producto || null; // Id del producto
        const id_almacen = req.query.id_almacen || null; // Id del almacen
        if( !id_producto || !id_almacen) {
            return res.status( 400 ).json({
                success: false,
                message: 'El id del producto y del almacen son requeridos'
            });
        }
        const producto = {
            id_producto: id_producto,
            id_almacen: id_almacen
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

    getAllProduct(req, res){
        Producto.getAllProduct(( err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al obtener los productos',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data //Datos de los documentos
            });
        
        });
    },

    updateDetailsProduct ( req, res ) {
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

    getTransactionsProduct ( req, res ) {
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

    getProvisionProduct ( req, res ) {
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
