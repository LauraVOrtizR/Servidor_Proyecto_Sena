const db = require('../config/config');
const { lock } = require('../routes/almacenRoutes');
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

Almacen.deleteAlmacen = (store, result) => {
    const sql = 'UPDATE almacenes SET estado = 0 WHERE id_almacen = ?'
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
            }
            else {
                console.log('Almacen actualizado: ', res);
                result(null, res, { message: 'Almacen actualizado' });
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
            store.id_almacen,
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