'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var secret_key = 'gR7cH9Svfj8JLe4c186Ghs48hheb3902nh5DsA';

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({message: 'La peticion no tiene la cabecera de Autenticacion.'})
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret_key);

        if(payload.exp <= moment().unix()){
            return res.status(404).send({message: 'El token ha expirado.'})
        }
    } catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'Token invalido.'})
    }

    req.employee = payload;
    
    next();
}