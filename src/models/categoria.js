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

Categoria.getCategoria = (category, result) => {
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

module.exports = Categoria;