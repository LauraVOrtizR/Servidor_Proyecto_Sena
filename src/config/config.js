const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'varietyvault'
});

db.connect(function(err) {
    if(err) throw err;
    console.log('Base de datos conectada')
});

module.exports = db;


