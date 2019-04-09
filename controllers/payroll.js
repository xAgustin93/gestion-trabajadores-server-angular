'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Payroll = require('../models/payroll');
var jwt = require('../services/jwt');

function addPayroll(req, res) {
    let payroll = new Payroll;
    
    const body = req.body;
    payroll.date = body.date;
    payroll.employee = body.employee;
    payroll.file = "";

    let file_name = "No subido...";
    // console.log(req.files);

    if(req.files) {
        let file_path = req.files.file.path;
        let file_split = file_path.split('/');
        let file_name = file_split[2];

        let ext_split = file_name.split('.');
        let file_ext = ext_split[1];

        if(file_ext === 'pdf') {
            payroll.file = file_name;
            
            payroll.save( (err, payrollStore) => {
                if(err) {
                    res.status(500).send({message: 'Error de servidor'});
                } else {
                    if(!payrollStore) {
                        res.status(404).send({message: 'Error al dar de lata la nueva nomina'});
                    } else {
                        res.status(200).send({payroll: payrollStore});
                    }
                }
            })
            
        } else {
            res.status(200).send({message: 'Extension del archivo no valida (Permitido: .pdf)'});
        }
    } else {
        res.status(200).send({message: 'No se ha subido ninguna nomina.'});
    }
}



function getPayrollFile(req, res){
    var nameFile = req.params.nameFile;
    // console.log(req.params);
    
    var path_file = './uploads/payroll/' + nameFile;

    fs.exists(path_file, function(exists) {
        if(exists){
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({message: 'La nomina que buscas ya no existe.'});
        }
    });
}




module.exports = {
    addPayroll,
    getPayrollFile
};