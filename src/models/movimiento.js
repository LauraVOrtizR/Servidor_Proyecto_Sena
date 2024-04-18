const db = require('../config/config');
const Movimiento = {};

Movimiento.getEntradasSalidas = (operation, result) => {
    const sql =
    `SELECT CONCAT('ENT', entradas.id_entrada) AS referencia, fecha_hora, nombre_producto, nombre_almacen AS origen, destino_entrada AS destino, CONCAT('+',cantidad_entrada) AS cantidad
    FROM entradas 
    JOIN Productos_entradas ON entradas.id_entrada = Productos_entradas.id_entrada 
    JOIN Productos ON Productos_entradas.id_producto = Productos.id_producto
    JOIN almacenes ON almacenes.id_almacen = entradas.id_almacen
    WHERE fecha_hora > "2024-03-07" AND fecha_hora < "2024-04-05"
    UNION
    SELECT CONCAT('SAL', salidas.id_salida) AS referencia, fecha_hora, nombre_producto, nombre_almacen AS origen, destino_salida AS destino, CONCAT('-',cantidad_salida) AS cantidad 
    FROM salidas 
    JOIN productos_salidas ON salidas.id_salida = productos_salidas.id_salida 
    JOIN Productos ON productos_salidas.id_producto = Productos.id_producto 
    JOIN almacenes ON almacenes.id_almacen = salidas.id_almacen
    WHERE fecha_hora > "2024-03-07" AND fecha_hora < "2024-04-05";`
    ;
    db.query(
        sql,
        [
            operation.fecha,
            operation.fecha,
            operation.fecha,
            operation.fecha
        ],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Movimientos: ', res);
                result(null, res, {message: 'Movimientos obtenidos'});
            }
        }
        
    )
};

module.exports = Movimiento;