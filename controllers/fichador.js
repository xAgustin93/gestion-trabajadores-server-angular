'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Fichador = require('../models/fichador');
var jwt = require('../services/jwt');


function checkStatus(req, res) {
    const employeeId = req.params.id;

    const find = Fichador.find({employee: employeeId}).sort({date: 'desc'});

    find.exec((err, fichajes) => {
        if(err){
            res.status(500).send({message: 'Error de servidor.'});
        } else {
            if(!fichajes){
                res.status(404).send({message: 'Error al recoger fichajes.'});
            } else {
                res.status(200).send({fichajes});
            }
        }
    });
}

function checkIn(req, res) {
    let fichador = new Fichador;

    const params = req.params;
    fichador.date = new Date();
    fichador.check_in = true;
    fichador.check_out = false;
    fichador.employee = params.id;

    fichador.save( (err, fichadorStore) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor'});
        } else {
            if(!fichadorStore) {
                res.status(404).send({message: 'Error al fichar'});
            } else {
                res.status(200).send({payroll: fichadorStore});
            }
        }
    });
}

function checkOut(req, res) {
    let fichador = new Fichador;

    const params = req.params;
    fichador.date = new Date();
    fichador.check_in = false;
    fichador.check_out = true;
    fichador.employee = params.id;

    fichador.save( (err, fichadorStore) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor'});
        } else {
            if(!fichadorStore) {
                res.status(404).send({message: 'Error al fichar'});
            } else {
                res.status(200).send({payroll: fichadorStore});
            }
        }
    });
}




module.exports = {
    checkIn,
    checkStatus,
    checkOut
};