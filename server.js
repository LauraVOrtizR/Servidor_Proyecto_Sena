const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use = (cors());

// app.use ((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./src/routes/almacenRoutes'));
app.use(require('./src/routes/usuarioRoutes'));
app.use(require('./src/routes/categoriaRoutes'));
app.use(require('./src/routes/movimientoRoutes'));
app.use(require('./src/routes/productoRoutes'));
app.use(require('./src/routes/informesRoutes'));

//Inicializar el servidor
app.listen(3000, () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
