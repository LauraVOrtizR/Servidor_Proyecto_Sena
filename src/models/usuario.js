const db = require('../config/config');
const Usuario = {};

Usuario.create = (user, result) => {
    const sql = 'SELECT COUNT(*) AS datos_existentes FROM usuarios WHERE correo_electronico = ? OR numero_documento = ?'
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
                console.log('Datos existentes: ', res[0]);
                if(res[0].datos_existentes > 0) {
                    result(null, {message: 'El usuario ya existe'});
                }
                else {
                    const sql = 'INSERT INTO usuarios(nombre_usuario, tipo_documento, numero_documento, correo_electronico, contraseña, id_rol)VALUES (?, ?, ?, ?, ?, ?)' 
                    ;
                    db.query(
                        sql,
                        [
                            user.nombre_usuario,
                            user.tipo_documento,
                            user.numero_documento,
                            user.correo_electronico,
                            user.contraseña,
                            user.id_rol
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

Usuario.login = (user, result) => {
    const sql = 'SELECT correo_electronico, contraseña, id_rol FROM usuarios WHERE correo_electronico = ? AND contraseña = ?'
    ;
    db.query(
        sql,
        [
            user.correo_electronico,
            user.contraseña,
            user.id_rol
        ],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Usuario encontrado: ', res);
                result(null, res, {message: 'Inicio de sesión exitoso'});
            }
        }
    )
};

Usuario.updatePerfil = (user, result) => {
    const sql = 'UPDATE usuarios SET nombre_usuario = ?, id_rol = ? WHERE id_usuario = ?'
    ;
    db.query(
        sql,
        [
            user.nombre_usuario,
            user.id_rol,
            user.id_usuario
        ],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Perfil actualizado: ', res);
                result(null, res, {message: 'Perfil actualizado'});
            }
        }
    )
};

Usuario.deletePerfil = (user, result) => {
    const sql = 'DELETE FROM usuarios WHERE id_usuario = ?'
    ;
    db.query(
        sql,
        [user.id_usuario],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Perfil eliminado: ', res);
                result(null, res, {message: 'Perfil eliminado'});
            }
        }
    )
};

Usuario.getPerfil = (user, result) => {
    const sql = `SELECT nombre_usuario, tipo_documento, numero_documento, correo_electronico, contraseña FROM usuarios WHERE id_usuario = ?`
    ;
    db.query(
        sql,
        [user.id_usuario],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
            }
            else{
                console.log('Perfil encontrado: ', res);
                result(null, res, {message: 'Perfil encontrado'});
            }
        }
    )
}

module.exports = Usuario;

