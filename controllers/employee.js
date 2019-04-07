'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Employee = require('../models/employee');
var jwt = require('../services/jwt');

function registrationEmployee(req, res) {
    var employee = new Employee;

    var params = req.body;
    employee.name = params.name;
    employee.lastname = params.lastname;
    employee.dni = '';
    employee.start_contract = '';
    employee.end_contract = '';
    employee.type_contract = '';
    employee.bank_name = '';
    employee.back_holder = '';
    employee.back_number = '';
    employee.email = params.email.toLowerCase();
    employee.password = params.password;
    employee.role = 'ROLE_EMPLOYEE';
    employee.active = false;

    if(employee.password) {
        bcrypt.hash(params.password, null, null, function(err, hash) {
            employee.password = hash;
            
            if(employee.name != '' && employee.lastname != '' && employee.email != ''){
                employee.save((err, employeeStored) => {
                    if(err) {
                        res.status(500).send({message: 'Error de servidor. CreateEmployee.'})
                    } else {
                        if(!employeeStored) {
                            res.status(404).send({message: 'No se ha podido crear el usuario'});
                        } else {
                            res.status(200).send({employee: employeeStored});
                        }
                    }
                })
            }
        });
    } else {
        res.status(200).send({message: 'Introduce una contraseña.'});
    }
}

function loginEmployee(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;


    Employee.findOne({email: email.toLowerCase()}, (err, employee) => {
        if(err){
            res.status(500).send({message: 'Error de servidor.'});
        } else {            
            if(!employee){
                res.status(404).send({message: 'El empleado no existe.'});
            } else {
                // Comprobamos la contrasela.
                bcrypt.compare(password, employee.password, function(err, check){
                    if(check){
                        // Devolver los datos del usuario logeado.
                        if(params.gethash){
                            // Devolvemos un Token de JWT.
                            res.status(200).send({token: jwt.createToken(employee)});
                        } else {
                            res.status(200).send({employee});
                        }
                    } else {
                        res.status(404).send({message: 'El empleado no ha podido logearse.'})
                    }
                });
            }
        }
    });
}

function getEmployees(req, res) {
    console.log('getEmployees Method Load');
}

function getEmployeeById(req, res) {
    const userId = req.params.id;
    
    Employee.findById(userId, (err, employee) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor'});
        } else {
            if(!employee) {
                res.status(404).send({message: 'No se ha encontrado ningun empleado'});
            } else {
                res.status(200).send(employee);
            }
        }
    });
}

function updateEmployeeById(req, res) {
    const employeeId = req.body._id;
    const params = req.body;
    
    Employee.findByIdAndUpdate({_id: employeeId}, params, (err, employeUpdate) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor'});
        } else {
            if(!employeUpdate) {
                res.status(404).send({message: 'No se ha encontrado el usuario que se quiere modificar'});
            } else {
                res.status(200).send({employee: params});
            }
        }
    });
}


module.exports = {
    registrationEmployee,
    loginEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployeeById
};