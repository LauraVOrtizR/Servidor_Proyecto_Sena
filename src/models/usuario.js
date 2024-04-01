const mysql = require('../config/config');
const Usuario = {};
Usuario.create = (user, result) => {
    const sql = `SELECT COUNT(*) AS datos_existentes FROM usuarios 
                WHERE correo_electronico = ? OR numero_documento = ?;`
    ;
    db.query(
        sql,
        [user.correo_electronico, user.numero_documento],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Datos existentes: ', res[0].datos_existentes);
                if(datos_existentes > 0) {
                    result(null, {message: 'El usuario ya existe'});
                }
                else {
                    const sql = `INSERT INTO usuarios(
                                nombre_completo,
                                tipo_documento,
                                numero_documento,
                                correo_electronico,
                                contraseña,
                                rol
                            )
                            VALUES (?, ?, ?, ?, ?, ?);`
                    ;
                    db.query(
                        sql,
                        [
                            user.nombre_completo,
                            user.tipo_documento,
                            user.numero_documento,
                            user.correo_electronico,
                            user.contraseña,
                            user.rol
                        ],
                        (err, res) => {
                            if(err) {
                                console.log('error: ', err);
                                result(err, null);
                            }
                            else{
                                console.log('Id del nuevo usuario: ', res.insertId);
                                result(null, res.insertId, {message: 'Usuario creado'});
                            }
                        }
                    )
                }
            }
        }
    )
};

module.exports = Usuario;

