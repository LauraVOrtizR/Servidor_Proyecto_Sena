const db = require('../config/config');
const Informe = {};

Informe.mostrar = ( informe, result ) => {
    console.log( 'Ingreso al modelo' )
    const sql = `
    SELECT productos.id_producto,
        cantidad_salida
    FROM productos_salidas
    JOIN productos ON productos_salidas.id_producto = productos.id_producto
    JOIN salidas ON productos_salidas.id_salida = salidas.id_salida
    WHERE productos.id_producto = ?
        AND salidas.fecha >= ?
        AND salidas.fecha < ?;
`;
    db.query(
        sql,
        [
            informe.id_producto,
            informe.fecha_inicio,
            informe.fecha_fin
        ],
        ( err, res ) => {
            if( err ) {
                console.log( 'error: ', err );
                result( err, null );
            }
            else{
                console.log( 'Datos del informe: ', res );
                result( null, res );
            }
        }
    )
}

module.exports = Informe;