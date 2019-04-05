'use strict'

var express = require('express');
var EmployeeController = require('../controllers/employee');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/get-employees', EmployeeController.getEmployees);
api.post('/registration-employee', EmployeeController.registrationEmployee);
api.post('/login', EmployeeController.loginEmployee);

module.exports = api;