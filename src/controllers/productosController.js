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
    }
};

