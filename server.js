const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./src/routes/usuarioRoutes'));

//Inicializar el servidor
app.listen(3000, () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
