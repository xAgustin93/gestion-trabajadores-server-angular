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

function getAds(req, res) {
    var find = Ads.find().sort({date: 'desc'});

    find.exec((err, ads) => {
        if(err){
            res.status(500).send({message: 'Error de servidor.'});
        } else {
            if(!ads){
                res.status(404).send({message: 'No se ha encontrado ninguna noticia.'});
            } else {
                res.status(200).send({ads});
            }
        }
    });
}

function deleteAd(req, res) {

    const params = req.params;
    const id = params.id

    Ads.findByIdAndDelete({_id: id}, (err, adDelete) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor.'});
        } else {
            if(!adDelete){
                return res.status(404).send({message: 'No se ha podido borrar la noticia.'});
            } else {
                return res.status(202).send({ad: adDelete});
            } 
        }
    });
}


module.exports = {
    addAd,
    getAds,
    deleteAd
};