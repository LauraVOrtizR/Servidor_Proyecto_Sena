const db = require('../config/config');
const Informe = {};

Informe.getSalesByProduct = ( informe, result ) => {
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

Informe.getTopSalesByCategory = ( informe, result ) => {
    const sql = `
    SELECT nombre_categoria, 
        COUNT(productos_salidas.id_salida) AS "Cantidad de Salidas", 
        SUM(precio_venta * cantidad_salida) AS "Ventas"
    FROM categorias
    JOIN productos ON productos.id_categoria = categorias.id_categoria
    JOIN productos_salidas ON productos_salidas.id_producto = productos.id_producto
    JOIN salidas ON productos_salidas.id_salida = salidas.id_salida
    WHERE fecha >= ? AND fecha <= ?
    GROUP BY nombre_categoria
    ORDER BY SUM(precio_venta * cantidad_salida) DESC
    LIMIT 3;
`;
    db.query(
        sql,
        [
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

Informe.getSalesByStore = ( informe, result ) => {
    const sql = `
    SELECT nombre_almacen, 
       SUM(precio_venta * cantidad_producto_almacen) AS Ventas 
    FROM Almacenes 
    JOIN almacenes_productos ON almacenes.id_almacen = almacenes_productos.id_almacen 
    JOIN productos ON almacenes_productos.id_producto = productos.id_producto 
    WHERE almacenes.id_almacen = ? 
    GROUP BY nombre_almacen;
`;
    db.query(
        sql,
        [
            informe.id_almacen
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