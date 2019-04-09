'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


// Load routing
var employee_routes = require('./routers/employee');
var ads_routes = require('./routers/ads');
var proposal_proposal = require('./routers/proposal');
var payroll_payroll = require('./routers/payroll');


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
app.use('/api', proposal_proposal);
app.use('/api', payroll_payroll);


module.exports = app;