'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdsSchema = Schema({
    date: Date,
    title: String,
    description: String
});

module.exports = mongoose.model('Ads', AdsSchema);