'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;
var portDb = 27017;

mongoose.connect(`mongodb://localhost:${portDb}/worker_management`, { useNewUrlParser: true }, (err, res) => {
    if(err) {
        throw err;
    } else {
        console.log('La conexion a la base de datos esta funcionando correctamente.');

        app.listen(port, () => {
            console.log('Servidor del API Rest de Gestion de Trabajadores escuchando en http://localhost:' + port);
        });
    }
});