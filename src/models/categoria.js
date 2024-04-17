const db = require('../config/config');
const Categoria = {};

Categoria.create = (category, result) => {
    const sql = `INSERT INTO categorias(nombre_categoria) VALUES (?)`
    ;
    db.query(
        sql,
        [category.nombre_categoria],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Id de la nueva categoria: ', res.insertId);
                result(null, res.insertId, {message: 'Categoria creada'});
            }
        }
    )
};

Categoria.getCategoria = (result) => {
    const sql = 'SELECT nombre_categoria FROM categorias'
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
    const sql = `UPDATE categorias SET estado_categoria = 0 WHERE id_categoria = ?`
    ;
    db.query(
        sql,
        [category.id_categoria],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Categoria eliminada: ', res);
                result(null, res, {message: 'Categoria eliminada'});
            }
        }
    )
}

Categoria.updateCategoria = (category, result) => {
    const sql = `UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?`
    ;
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