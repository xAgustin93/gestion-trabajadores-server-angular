'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FichadorSchema = Schema({
    date: Date,
    check_in: Boolean,
    check_out: Boolean,
    employee: {
        type: Schema.ObjectId,
        ref: 'Employee'
    }
});

module.exports = mongoose.model('Fichador', FichadorSchema);