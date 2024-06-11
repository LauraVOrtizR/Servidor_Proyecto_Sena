const Categoria = require('../models/categoria');
module.exports = {
    createCategory(req, res) {
        const category = req.body;
        Categoria.create(category, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al crear la categoria',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: res.message,
                data: data
            });
        });
    },

    getCategory(req, res) {
        Categoria.getCategoria ((err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al obtener la categoria',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data
            });
        });
    },

    deleteCategory(req, res) {
        const category = req.body;
        Categoria.deleteCategoria(category, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al eliminar la categoria',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data
            });
        });
    },
    
    updateCategory(req, res) {
        const category = req.body;
        console.log( {message: 'Categoria a actualizada'})
        Categoria.updateCategoria(category, (err, data) => {
            if(err) {
                res.status(501).json({
                    success: false,
                    message: 'Error al actualizar la categoria',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: res.message,
                data: data
            });
        });
    }
};