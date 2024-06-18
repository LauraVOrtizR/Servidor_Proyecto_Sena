const db = require('../config/config');
const Movimiento = {};

Movimiento.getOperations = (operation, result) => {
    const sql =
    `SELECT CONCAT('ENT', entradas.id_entrada) AS referencia, fecha_hora, nombre_producto, nombre_almacen 
    AS 'origen/destino', CONCAT('+',cantidad_entrada) AS cantidad
    FROM entradas 
    JOIN Productos_entradas ON entradas.id_entrada = Productos_entradas.id_entrada 
    JOIN Productos ON Productos_entradas.id_producto = Productos.id_producto
    JOIN almacenes ON almacenes.id_almacen = entradas.id_almacen
    WHERE (fecha_hora >= ? AND fecha_hora < ?) AND almacenes.id_almacen = 2
    UNION
    SELECT CONCAT('SAL', salidas.id_salida) AS referencia, fecha_hora, nombre_producto, destino_salida AS 'origen/destino', CONCAT('-',cantidad_salida) AS cantidad 
    FROM salidas 
    JOIN productos_salidas ON salidas.id_salida = productos_salidas.id_salida 
    JOIN Productos ON productos_salidas.id_producto = Productos.id_producto 
    JOIN almacenes ON almacenes.id_almacen = salidas.id_almacen
    WHERE (fecha_hora >= ? AND fecha_hora < ?) AND almacenes.id_almacen = 2
    `
    ;
    db.query(
        sql,
        [
            operation.fecha_inicio,
            operation.fecha_fin,
            operation.fecha_inicio,
            operation.fecha_fin
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

Movimiento.createEntrada = (operation, result) => {
    const sql = `INSERT INTO entradas(fecha, origen_entrada, id_almacen) VALUES (?,?,?)`;
    db.query(
        sql,
        [
            new Date(),
            operation.origen_entrada,
            operation.id_almacen,
        ],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                const id_entrada = res.insertId;
                const sql = `INSERT INTO productos_entradas(id_producto, id_entrada, cantidad_entrada, precio_compra) VALUES (?,?,?,?)`;
                db.query(
                    sql,
                    [
                        operation.id_producto,
                        operation.id_entrada,
                        operation.cantidad_entrada,
                        operation.precio_compra
                    ],
                    (err, res) => {
                        if(err) {
                            console.log('error: ', err);
                            const sql = `DELETE FROM entradas WHERE id_entrada = ?`;
                            db.query(
                                sql,
                                [
                                    id_entrada
                                ]
                            )
                            result(err, null);
                        }
                        else{
                            const sql = 
                            `UPDATE almacenes_productos SET cantidad_producto_almacen = cantidad_producto_almacen + ? 
                            WHERE id_producto = ? AND id_almacen = ?`
                            ;
                            db.query(
                                sql,
                                [
                                    operation.cantidad_entrada,
                                    operation.id_producto,
                                    operation.id_almacen
                                ],
                            )
                            console.log('Id de la nueva entrada: ', id_entrada);
                            result(null, id_entrada, {message: 'Entrada creada'});
                        }
                    }
                )
            }
        }
    )
};

Movimiento.createSalida = (operation, result) => {
    const sql = `INSERT INTO salidas(fecha, destino_salida, id_almacen) VALUES (?,?,?)`;
    db.query(
        sql,
        [
            new Date(),
            operation.destino_salida,
            operation.id_almacen,
        ],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                const id_salida = res.insertId;
                const sql = `INSERT INTO productos_salidas(id_producto, id_salida, cantidad_salida) VALUES (?,?,?)`;
                db.query(
                    sql,
                    [
                        operation.id_producto,
                        operation.id_salida,
                        operation.cantidad_salida,
                    ],
                    (err, res) => {
                        if(err) {
                            console.log('error: ', err);
                            const sql = `DELETE FROM salidas WHERE id_salida = ?`;
                            db.query(
                                sql,
                                [
                                    id_salida
                                ]
                            )
                            result(err, null);
                        }
                        else{
                            const sql = 
                            `UPDATE almacenes_productos SET cantidad_producto_almacen = cantidad_producto_almacen - ? 
                            WHERE id_producto = ? AND id_almacen = ?`
                            ;
                            db.query(
                                sql,
                                [
                                    operation.cantidad_salida,
                                    operation.id_producto,
                                    operation.id_almacen
                                ],
                            )
                            console.log('Id de la nueva salida: ', id_salida);
                            result(null, id_salida, {message: 'Salida creada'});
                        }
                    }
                )
            }
        }
    )
}



module.exports = Movimiento;