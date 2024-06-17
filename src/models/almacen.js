const db = require('../config/config');
const Almacen = {};

Almacen.create = (store, result) => {
    const sql = 'INSERT INTO Almacenes (nombre_almacen, direccion_almacen, descripcion_almacen)VALUES (?, ?, ?)'
        ;
    db.query(
        sql,
        [
            store.nombre_almacen,
            store.direccion_almacen,
            store.descripcion_almacen,
        ],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo Almacen: ', res.insertId);
                result(null, res.insertId, { message: 'Almacen Creado' });
            }
        }
    )
}

Almacen.asignAlmacen = (store, result) => {
    const sql = `INSERT INTO almacenes_usuarios (id_almacen, id_usuario)VALUES (?, ?)`
        ;
    db.query(
        sql,
        [
            store.id_almacen,
            store.id_usuario,
        ],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            }
            else {
                console.log('Id del almacen asignado: ', res.insertId);
                result(null, res.insertId, { message: 'Almacen asignado' });
            }
        }
    )
}

Almacen.getById = (store, result) => {
    const sql = 'SELECT nombre_almacen, direccion_almacen, descripcion_almacen FROM almacenes WHERE id_almacen = ?'
        ;
    db.query(
        sql,
        [
            store.id_almacen
        ],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
}

Almacen.getByUser = (store, result) => {
    const sql = `SELECT almacenes.id_almacen, nombre_almacen, direccion_almacen, descripcion_almacen, estado_almacen FROM almacenes  
                JOIN almacenes_usuarios ON almacenes.id_almacen = almacenes_usuarios.id_almacen
                WHERE id_usuario = ? AND estado_almacen = 1`
        ;
    db.query(
        sql,
        [
            store.id_usuario
        ],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
}

Almacen.deleteAlmacen = (store, result) => {
    const sql = `
    SELECT SUM(cantidad_producto_almacen) AS cantidad_existente FROM almacenes_productos WHERE id_almacen=?
    `;
    db.query(
        sql,
        [
            store.id_almacen
        ],
        (err, res) => {
            if(err){
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('prueba', res[0]);
                if(res[0].cantidad_existente == null || res[0].cantidad_existente == 0){
                    const sql = `
                    UPDATE almacenes SET estado_almacen = 0 WHERE id_almacen = ?
                    `;
                    db.query(
                        sql,
                        [
                            store.id_almacen
                        ],
                        (err, res) => {
                            if (err) {
                                console.log('error: ', err);
                                result(err, null);
                            }
                            else {
                                console.log('Almacen actualizado: ', res);
                                result(null, res, { message: 'Almacen actualizado' });
                            }
                        }
                    );
                }
                else{
                    console.log(res[0].cantidad_existente)
                    result(null, {message: 'No se puede eliminar el almacen, tiene productos asignados'});
                }
            }
        }
    )
}

Almacen.updateAlmacen = (store, result) => {
    const sql = `UPDATE almacenes SET nombre_almacen = ?, direccion_almacen = ?, descripcion_almacen = ? WHERE id_almacen = ?`
        ;
    db.query(
        sql,
        [
            store.nombre_almacen, 
            store.direccion_almacen, 
            store.descripcion_almacen, 
            store.id_almacen
        ], 
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            }
            else {
                console.log('Almacen actualizado: ', res);
                result(null, res, { message: 'Almacen actualizado' });
            }
        }
    );
}

module.exports = Almacen;