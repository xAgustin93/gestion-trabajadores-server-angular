'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


// Load routing
var employee_routes = require('./routers/employee');
var ads_routes = require('./routers/ads');
var proposal_routes = require('./routers/proposal');
var payroll_routes = require('./routers/payroll');
var fichador_routes = require('./routers/fichador');


app.use(bodyParser.urlencoded({
    extends: false
}));
app.use(bodyParser.json());

// Configure Header HTTP 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Router Basic
app.use('/api', employee_routes);
app.use('/api', ads_routes);
app.use('/api', proposal_routes);
app.use('/api', payroll_routes);
app.use('/api', fichador_routes);


module.exports = app;