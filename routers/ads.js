'use strict'

var express = require('express');
var AdsController = require('../controllers/ads');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/add-ad', md_auth.ensureAuth, AdsController.addAd);
api.get('/get-ads', md_auth.ensureAuth, AdsController.getAds);
api.delete('/delete-ad/:id', md_auth.ensureAuth, AdsController.deleteAd);


module.exports = api;