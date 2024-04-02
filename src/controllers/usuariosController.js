const Usuario = require('../models/usuario');
module.exports = {
    register(req, res) {
        const user = req.body; //Datos del cliente
        Usuario.create(user, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al crear el usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: res.message,
                data: data //Id del usuario creado
            });
        });
    },

    login(req, res) {
        const user = req.body;
        Usuario.login(user, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al iniciar sesión',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data //Datos del usuario
            });
        });
    },

    updatePerfil(req, res) {
        const user = req.body;
        Usuario.updatePerfil(user, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al actualizar el perfil',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data //Datos del usuario actualizado
            });
        });
    }
};
