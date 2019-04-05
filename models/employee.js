'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeSchema = Schema({
    name: String,
    lastname: String,
    dni: String,
    date_start: Date,
    date_end: Date,
    type_contract: String,
    bank_name: String,
    back_holder: String,
    back_number: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active: Boolean
});

module.exports = mongoose.model('Employee', EmployeeSchema);