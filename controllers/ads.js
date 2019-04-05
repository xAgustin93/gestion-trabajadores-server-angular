'use strict'

var fs = require('fs');
var path = require('path');
var jwt = require('../services/jwt');

var Ads = require('../models/ads');


function addAd(req, res) {
    var ad = new Ads();

    var params = req.body;
    ad.date = new Date();
    ad.title = params.title;
    ad.description = params.description;

    console.log(ad);

    ad.save((err, adStore) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor.'});
        } else {
            if(!adStore) {
                res.status(500).send({message: 'No se ha podido crear el producto.'});
            } else {
                res.status(200).send({ad: adStore});
            }
        }
    })
}

module.exports = {
    addAd
};