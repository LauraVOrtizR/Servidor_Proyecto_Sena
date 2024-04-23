const Informe = require(  '../models/informes' );

module.exports = {
    mostrar( req, res ) {
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

        Informe.mostrar( informe, ( err, data ) => {
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
}

