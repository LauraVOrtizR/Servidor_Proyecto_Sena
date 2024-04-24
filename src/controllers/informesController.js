const Informe = require(  '../models/informes' );

module.exports = {
    getSalesByProduct( req, res ) {
        const id_producto = req.query.id_producto || null; // Id del producto
        const fecha_inicio = req.query.fecha_inicio || null; // Fecha del informe
        const fecha_fin = req.query.fecha_fin || null; // Fecha del informe
        console.log( 'Id_producto: ', req.query.id_producto )

        if( !id_producto ) {
            return res.status( 400 ).json({
                success: false,
                message: 'El id del producto es requerido'
            });
        }

        if( !fecha_inicio || !fecha_fin ) {
            return res.status( 400 ).json({
                success: false,
                message: 'Las fechas son requeridas'
            });
        }

        const informe = {
            id_producto: id_producto,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin
        };

        Informe.getSalesByProduct( informe, ( err, data ) => {
            if( err ) {
                res.status( 501 ).json({
                    success: false,
                    message: 'Error al leer los informes',
                    error: err
                });
            }
            return res.status( 200 ).json({
                success: true,
                message: res.message,
                data: data // Datos de los informes
            });
        });
    },

    getTopSalesByCategory( req, res ) {
        const fecha_inicio = req.query.fecha_inicio || null; // Fecha del informe
        const fecha_fin = req.query.fecha_fin || null; // Fecha del informe

        if( !fecha_inicio || !fecha_fin ) {
            return res.status( 400 ).json({
                success: false,
                message: 'Las fechas son requeridas'
            });
        }

        const informe = {
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin
        };

        Informe.getTopSalesByCategory( informe, ( err, data ) => {
            if( err ) {
                res.status( 501 ).json({
                    success: false,
                    message: 'Error al leer los informes',
                    error: err
                });
            }
            return res.status( 200 ).json({
                success: true,
                message: res.message,
                data: data // Datos de los informes
            });
        });
    },

    getSalesByStore( req, res ) {
        const id_almacen = req.query.id_almacen || null; // Id del producto

        if( !id_almacen ) {
            return res.status( 400 ).json({
                success: false,
                message: 'El id del almacen es requerido'
            });
        }

        const informe = {
            id_almacen : id_almacen,
        };

        Informe.getSalesByStore( informe, ( err, data ) => {
            if( err ) {
                res.status( 501 ).json({
                    success: false,
                    message: 'Error al leer los informes',
                    error: err
                });
            }
            return res.status( 200 ).json({
                success: true,
                message: res.message,
                data: data // Datos de los informes
            });
        });
    }


}

