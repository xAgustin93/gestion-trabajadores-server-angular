'use strict'

var express = require('express');
var AdsController = require('../controllers/ads');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/add-ad', md_auth.ensureAuth, AdsController.addAd);


module.exports = api;