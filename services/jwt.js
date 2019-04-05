'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var secret_key = 'gR7cH9Svfj8JLe4c186Ghs48hheb3902nh5DsA';

exports.createToken = function (employee){
    var payload = {
        sub: employee._id,
        name: employee.name,
        lastname: employee.lastname,
        email: employee.email,
        role: employee.role,
        avatar: employee.avatar,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };    

    return jwt.encode(payload, secret_key);
};