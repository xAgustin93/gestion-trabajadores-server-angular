'use strict'

var express = require('express');
var FichadorController = require('../controllers/fichador');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/check-status/:id', [md_auth.ensureAuth], FichadorController.checkStatus);
api.post('/check-in/:id', [md_auth.ensureAuth], FichadorController.checkIn);
api.post('/check-out/:id', [md_auth.ensureAuth], FichadorController.checkOut);


module.exports = api;