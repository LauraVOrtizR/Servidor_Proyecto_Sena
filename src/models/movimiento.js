const db = require('../config/config');
const Movimiento = {};

Movimiento.getOperations = (operation, result) => {
    const sql =
    `SELECT CONCAT('ENT', entradas.id_entrada) AS referencia, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha, nombre_producto, nombre_almacen 
    AS 'origen_destino', CONCAT('+',cantidad_entrada) AS cantidad
    FROM entradas 
    JOIN Productos_entradas ON entradas.id_entrada = Productos_entradas.id_entrada 
    JOIN Productos ON Productos_entradas.id_producto = Productos.id_producto
    JOIN almacenes ON almacenes.id_almacen = entradas.id_almacen
    WHERE (fecha >= ? AND fecha < ?) AND almacenes.id_almacen = ?
    UNION
    SELECT CONCAT('SAL', salidas.id_salida) AS referencia, DATE_FORMAT(fecha, '%Y-%m-%d'), nombre_producto, destino_salida AS 'origen_destino', CONCAT('-',cantidad_salida) AS cantidad 
    FROM salidas 
    JOIN productos_salidas ON salidas.id_salida = productos_salidas.id_salida 
    JOIN Productos ON productos_salidas.id_producto = Productos.id_producto 
    JOIN almacenes ON almacenes.id_almacen = salidas.id_almacen
    WHERE (fecha >= ? AND fecha < ?) AND almacenes.id_almacen = ?
    `
    ;
    db.query(
        sql,
        [
            operation.fecha_inicio,
            operation.fecha_fin,
            operation.id_almacen,
            operation.fecha_inicio,
            operation.fecha_fin,
            operation.id_almacen
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

Movimiento.createEntry = (operation, result) => {
    
    let lista_entradas = operation.productos_entradas.map(item =>[item.id_producto, item.cantidad_entrada, item.precio_compra]);

    const sql = `INSERT INTO entradas(fecha, origen_entrada, id_almacen) VALUES (?, ?, ?)`;
    db.query(
        sql,
        [
            new Date(),
            operation.origen_entrada,
            operation.id_almacen
        ],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                const id_entrada = res.insertId;
                lista_entradas = lista_entradas.map(sublist => [id_entrada, ...sublist]);

                const sql = `INSERT INTO productos_entradas(id_entrada, id_producto, cantidad_entrada, precio_compra) VALUES ?`;
                db.query(
                    sql,
                    [
                        lista_entradas
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
                            let lista_almacen_producto = lista_entradas.map(sublist => [sublist[2], sublist[1], operation.id_almacen]);

                            lista_almacen_producto.forEach(values => {
                                const sql = 
                                `UPDATE almacenes_productos SET cantidad_producto_almacen = cantidad_producto_almacen + ? 
                                WHERE id_producto = ? AND id_almacen = ?`
                                ;
                                db.query(
                                    sql,
                                    [
                                        values[0],
                                        values[1],
                                        values[2]
                                    ],
                                )
                            })
                            console.log('Id de la nueva entrada: ', id_entrada);
                            result(null, id_entrada, {message: 'Entrada creada'});
                        }
                    }
                )
            }
        }
    )
};

Movimiento.createExit = (operation, result) => {

    let lista_salidas = operation.productos_salidas.map(item =>[item.id_producto, item.cantidad_salida]);
    console.log('Lista de salidas: ', lista_salidas);

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
                lista_salidas = lista_salidas.map(sublist => [id_salida, ...sublist]);
                console.log('Lista de salidas con id de salida: ', lista_salidas);

                const sql = `INSERT INTO productos_salidas(id_salida, id_producto, cantidad_salida) VALUES ?`;
                db.query(
                    sql,
                    [
                        lista_salidas
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
                            let lista_almacen_producto = lista_salidas.map(sublist => [sublist[2], sublist[1], operation.id_almacen]);
                            console.log('Lista de almacenes y productos: ', lista_almacen_producto);

                            lista_almacen_producto.forEach(values => {
                                const sql = 
                                `UPDATE almacenes_productos SET cantidad_producto_almacen = cantidad_producto_almacen - ? 
                                WHERE id_producto = ? AND id_almacen = ?`
                                ;
                                db.query(
                                    sql,
                                    [
                                        values[0],
                                        values[1],
                                        values[2]
                                    ],
                                )
                            });
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