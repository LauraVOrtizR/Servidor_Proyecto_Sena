const db = require('../config/config');
const Categoria = {};

Categoria.create = (category, result) => {
    const sql = `
        SELECT * FROM categorias
        WHERE nombre_categoria = ? 
    `; // Consulta para verificar si ya existe la categoria en el almacen
    db.query(
        sql,
        [
            category.nombre_categoria,
        ],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else if(res[0] != null){
                console.log('Almacen ', res[0]);
                if(res[0].estado_categoria == 0) {
                    const sql = `
                    UPDATE categorias
                        SET estado_categoria = 1
                        WHERE id_categoria = ?
                    `; // Consulta para actualizar la categoria
                    db.query(
                        sql,
                        [
                            res[0].id_categoria
                        ],
                        (err, res) => {
                            if(err) {
                                console.log('error: ', err);
                                result(err, null);
                            }
                            else{
                                console.log('Categoria Crear: ', res);
                                result(null, res, {message: 'Categoria Creada'});
                            }
                        }
                    )
                }
                else if(res[0].estado_categoria == 1) {
                    result(null, {message: 'La categoria ya existe'});
                }
            }
            else if(res[0] == null){
                const sql = `
                INSERT INTO categorias(nombre_categoria) VALUES (?)
                `; // Consulta para insertar una categoria
                db.query(
                    sql,
                    [
                        category.nombre_categoria
                    ],
                    (err, res) => {
                        if(err) {
                            console.log('error: ', err);
                            result(err, null);
                        }
                        else{
                            console.log('Id de la categoria: ', res.insertId);
                            result(null, res.insertId, {message: 'Categoria creada'});
                        }
                    }
                )
            }
        }
    )
};

Categoria.getCategoria = (result) => {
    const sql = 'SELECT id_categoria, nombre_categoria FROM categorias WHERE estado_categoria = 1'
    ;
    db.query(
        sql,
        [],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Datos de la categoria: ', res);
                result(null, res, {message: 'Categoria obtenida'});
            }
        }
    )
};

Categoria.deleteCategoria = (category, result) => {
    const sql = `
    SELECT COUNT(id_categoria) AS cantidad_categoria FROM productos WHERE id_categoria = ?
    `; // Consulta para verificar si la categoria tiene productos
    db.query(
        sql,
        [
            category.id_categoria
        ],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Cantidad de categoria: ', res[0].cantidad_categoria);
                if(res[0].cantidad_categoria > 0) {
                    result(null, {message: 'No se puede actualizar la categoria porque tiene productos asociados'});
                }
                else{
                    const sql = `
                    UPDATE categorias
                        SET estado_categoria = 0
                        WHERE id_categoria = ?
                    `; // Consulta para eliminar la categoria
                    db.query(
                        sql,
                        [
                            category.id_categoria,
                            category.id_almacen
                        ],
                        (err, res) => {
                            if(err) {
                                console.log('error: ', err);
                                result(err, null);
                            }
                            else{
                                console.log('Categoria eliminada: ', res);
                                result(null, {res, message: 'Categoria eliminada'});
                            }
                        }
                    )
                }
            }
        }
    )
}

Categoria.updateCategoria = (category, result) => {
    const sql = `
    UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?
    `;
    db.query(
        sql,
        [category.nombre_categoria, 
        category.id_categoria],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Categoria actualizada: ', res);
                result(null, res, {message: 'Categoria actualizada'});
            }
        }
    )
}

module.exports = Categoria;