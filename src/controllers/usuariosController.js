const Usuario = require('../models/usuario');
module.exports = {
    getAllDocuments(req, res) {
        Usuario.getAllDocuments((err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al obtener los documentos',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data //Datos de los documentos
            });
        });
    },

    getAllRoles(req, res) {
        Usuario.getAllRoles((err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al obtener los documentos',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data //Datos de los documentos
            });
        });
    },

    getAllPermisions(req, res) {
        const user = req.query;
        Usuario.getAllPermisions(user,(err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al obtener los permisos',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data //Datos de los permisos
            });
        });
    },

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

    getAllProfile(req, res) {
        const user = req.query;
        Usuario.getAllProfile(user,(err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al obtener los perfiles',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data //Datos de los perfiles
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
    },

    deletePerfil(req, res) {
        const user = req.body;
        console.log('usuario a eliminar', user);
        Usuario.deletePerfil(user, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al eliminar el perfil',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message
            });
        });
    },

    getUsuario (req, res){
        const id_usuario = req.query.id_usuario || null;
        if(!id_usuario) {
            return res.status(400).json({
                success: false,
                message: 'El id del usuario es requerido'
            });
        }
        const user = {
            id_usuario: id_usuario
        };
        Usuario.getUsusario(user, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al obtener el perfil',
                    error: err
                });
            }
            if(data.length ==0){
                res.status(200).json({
                    success: false,
                    message: 'Usuario no encontrado',
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data //Datos del usuario
            });
        });
    },

    updateUsuario (req, res){
        const user = req.body;
        Usuario.updateUsuario(user, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al actualizar el usuario',
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
