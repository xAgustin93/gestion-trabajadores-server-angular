'use strict'

var express = require('express');
var PayrollController = require('../controllers/payroll');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload_payroll = multipart({ uploadDir: './uploads/payroll'})


api.post('/add-payroll', [md_auth.ensureAuth], PayrollController.addPayroll);
api.put('/add-payroll-file/:id', [md_auth.ensureAuth, md_upload_payroll], PayrollController.addPayrollFile);
api.get('/get-payroll-file/:nameFile', PayrollController.getPayrollFile);
api.get('/get-payrolls-by-employee/:id', [md_auth.ensureAuth], PayrollController.getPayrollsByEmployee);
api.delete('/delete-payroll-by-id/:id', [md_auth.ensureAuth], PayrollController.deletePayrollById);

module.exports = api;