const Movimiento = require('../models/movimiento');
module.exports = {
    
    getOperations(req, res) {
        const fecha_inicio = req.query.fecha_inicio || null;
        const fecha_fin = req.query.fecha_fin || null;
        const id_almacen = req.query.id_almacen || null;
        
        if(!fecha_inicio || !fecha_fin || !id_almacen) {
            return res.status(400).json({
                success: false,
                message: 'Falta la fecha de la operación'
            });
        }
        const operation = {
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            id_almacen: id_almacen

        };
        Movimiento.getOperations(operation, (err, data) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al obtener los movimientos',
                    error: err
                });
            }
            if(data.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: 'No se encontraron movimientos'
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data //Datos del movimiento
            });
        });
    },

    createEntrada(req, res) {
        const operation = req.body;
        Movimiento.createEntrada(operation, (err, data) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al crear la entrada',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Entrada creada',
                data: data //Datos de la entrada
            });
        });
    },

    createSalida(req, res) {
        const operation = req.body;
        Movimiento.createSalida(operation, (err, data) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al crear la salida',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Salida creada',
                data: data //Datos de la salida
            });
        });
    }
    
}
