'use strict'

var express = require('express');
var EmployeeController = require('../controllers/employee');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/registration-employee', EmployeeController.registrationEmployee);
api.post('/login', EmployeeController.loginEmployee);
api.get('/get-employees', EmployeeController.getEmployees);
api.get('/get-employee-by-id/:id', md_auth.ensureAuth, EmployeeController.getEmployeeById);
api.put('/update-employee-by-id', md_auth.ensureAuth, EmployeeController.updateEmployeeById);

module.exports = api;