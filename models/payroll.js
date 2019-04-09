'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PayrollSchema = Schema({
    file: String,
    date: Date,
    employee: {
        type: Schema.ObjectId,
        ref: 'Employee'
    }
});

module.exports = mongoose.model('Payroll', PayrollSchema);