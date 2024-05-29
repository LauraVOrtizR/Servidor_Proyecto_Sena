const Almacen = require('../models/almacen');
module.exports = {
    create(req, res) {
        const store = req.body; //Datos del almacen
        Almacen.create(store, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al crear el almacen',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: res.message,
                data: data //Id del almacen creado
            });
        });
    },

    getById (req, res) { 
        const id_almacen = req.query.id_almacen;
        if(!id_almacen){
            return res.status(400).json({
                success: false,
                message: 'Falta el id del almacen' 
            });
        }; 
        Almacen.getById(id_almacen, (err, data) => { 
            if (err) { 
                return res.status(501).json( 
                    { 
                        success: false, 
                        message: 'Error al obtener el almacen', 
                        error: err 
                    } 
                ); 
            } 
            return res.status(202).json( 
                { 
                    success: true, 
                    message: 'Almacen obtenido', 
                    data: data 
                } 
            ); 
        }); 
    },

    getByUser(req, res) {
        const id_usuario = req.query.id_usuario;
        if(!id_usuario) {
            return res.status(400).json({
                success: false,
                message: 'Falta el id del usuario'
            });
        }
        Almacen.getByUser(id_usuario, (err, data) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al obtener los almacenes',
                    error: err
                });
            }
            return res.status(202).json({
                success: true,
                message: 'Almacenes obtenidos',
                data: data
            });
        });
    },

    deleteAlmacen(req, res) {
        const id_almacen = req.body.id_almacen;
        Almacen.deleteAlmacen(id_almacen, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al actualizar el perfil',
                    error: err
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'Almacen actualizado',
                    data: data
                });
            }
        });
    },

    updateAlmacen(req, res) {
        const store = req.body;
        Almacen.updateAlmacen(store, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al actualizar el perfil',
                    error: err
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'Almacen actualizado',
                    data: data
                });
            }
        });
    },
};