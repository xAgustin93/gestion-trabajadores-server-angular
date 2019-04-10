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
    });



}

function addPayrollFile(req, res) {
    console.log('addPayrollFile......');
    console.log(req.params);
    let payrollId = req.params.id;

    console.log(payrollId);

    Payroll.findById({_id: payrollId}, (err, payrollData) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor'});
        } else {
            if(!payrollData) {
                res.status(404).send({message: 'No se ha encontrado ninguna nomina'});
            } else {
                let payroll = payrollData

                if(req.files) {
                    let file_path = req.files.file.path;
                    let file_split = file_path.split('/');
                    let file_name = file_split[2];

                    let ext_split = file_name.split('.');
                    let file_ext = ext_split[1];

                    if(file_ext === 'pdf') {

                        payroll.file = file_name;
                        Payroll.findByIdAndUpdate({_id: payroll._id}, payroll, (err, payrollUpdate) => {
                            if(err) {
                                res.status(500).send({message: 'Error de servidor'});
                            } else {
                                if(!payrollUpdate) {
                                    res.status(404).send({message: 'No se ha encontrado ninguna nomina nivel 2'});
                                } else {
                                    res.status(200).send({payroll: payrollUpdate});
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
        }
    });
}

function getPayrollFile(req, res){
    var nameFile = req.params.nameFile;

    var path_file = './uploads/payroll/' + nameFile;

    fs.exists(path_file, function(exists) {
        if(exists){
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({message: 'La nomina que buscas ya no existe.'});
        }
    });
}

function getPayrollsByEmployee(req, res) {
    const employeeId = req.params.id;

    Payroll.find({employee: employeeId}, (err, payrolls) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor'});
        } else {
            if(!payrolls) {
                res.status(404).send({message: 'No se ha encontrado ninguna nomina.'});
            } else {
                res.status(200).send({payrolls});
            }
        }
    });
}

function deletePayrollById(req, res) {
    const payrollId = req.params.id;

    Payroll.findByIdAndDelete({_id: payrollId}, (err, payrollDelete) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor'});
        } else {
            if(!payrollDelete) {
                res.status(404).send({message: 'No se ha encontrado la nomina ha eliminar.'});
            } else {
                res.status(200).send({payrollDelete});
            }
        }
    });
}




module.exports = {
    addPayroll,
    addPayrollFile,
    getPayrollFile,
    getPayrollsByEmployee,
    deletePayrollById
};