const db = require('../config/config');
const Categoria = {};

Categoria.create = (category, result) => {
    const sql = `
        SELECT COUNT(*) AS datos_existentes FROM almacenes_categorias
        JOIN categorias ON almacenes_categorias.id_categoria = categorias.id_categoria
        WHERE nombre_categoria = ? AND id_almacen = ?;
    `; // Consulta para verificar si ya existe la categoria en el almacen
    db.query(
        sql,
        [
            category.nombre_categoria,
            category.id_almacen
        ],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Datos existentes: ', res[0]);
                if(res[0].datos_existentes > 0) {
                    result(null, {message: 'La categoria ya existe'});
                }
                else{
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
                                let id_categoria = res.insertId;
                                const sql = `
                                INSERT INTO almacenes_categorias(id_almacen, id_categoria)
                                VALUES(?,?)
                                `; // Consulta para insertar la categoria en el almacen
                                db.query(
                                    sql,
                                    [
                                        category.id_almacen,
                                        id_categoria
                                    ],
                                    (err, res) => {
                                        if(err) {
                                            console.log('error: ', err);
                                            result(err, null);
                                        }
                                        else{
                                            result(null, {id_categoria, message: 'Categoria creada'});
                                            console.log('Id de la nueva categoria: ', res.insertId);
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        }
    )
};

Categoria.getCategoria = (category, result) => {
    const sql = `
        SELECT categorias.id_categoria, nombre_categoria FROM categorias
        JOIN almacenes_categorias ON categorias.id_categoria = almacenes_categorias.id_categoria
        WHERE id_almacen = ?
    `; // Consulta para obtener las categorias de un almacen
    db.query(
        sql,
        [
            category.id_almacen
        ],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Datos de la categoria: ', res);
                result(null, {res, message: 'Categoria obtenida'});
            }
        }
    )
};

Categoria.deleteCategoria = (category, result) => {
    const sql = `
    UPDATE almacenes_categorias
        SET estado_categoria_almacen = 0
        WHERE id_categoria = ? and id_almacen = 1
    `;
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