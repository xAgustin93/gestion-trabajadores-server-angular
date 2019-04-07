'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProposalSchema = Schema({
    date: Date,
    title: String,
    description: String,
    like: Number,
    disLike: Number,
    active: Boolean,
    employee_actions: Array
});

module.exports = mongoose.model('Proposal', ProposalSchema);