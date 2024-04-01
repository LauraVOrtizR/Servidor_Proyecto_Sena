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
                message: 'Usuario creado',
                data: data //Id del usuario creado
            });
        });
    }
};
