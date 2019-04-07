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
    
    var find = Employee.find().sort({name: 'desc'});

    find.exec( (err, employees) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor.'});
        } else {
            if(!employees) {
                res.status(404).send({message: 'No se ha encontrado ningun empleado'});
            } else {
                res.status(200).send({employees});
            }
        }
    });
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

    var answerRemovedSave;

    let newPassword = params.password;

    Employee.findById({_id: employeeId}, (err, employee) => {
        if(err) {
            res.status(500).send({message: 'Error del servidor'});
        } else {
            if(!employee) {
                res.status(404).send({message: 'No se ha encontrado el usuario que se quiere modificar'});
            } else {
                let lastPassword = employee.password;
                var paramsUpdate = params;

                if(lastPassword !== newPassword) {

                    bcrypt.hash(newPassword, null, null, function(err, hash) {
                        paramsUpdate.password = hash;

                        Employee.findByIdAndUpdate({_id: employeeId}, paramsUpdate, (err, employeUpdateData) => {
                            if(err) {
                                res.status(500).send({message: 'Error del servidor'});
                            } else {
                                if(!employeUpdateData) {
                                    res.status(404).send({message: 'No se ha encontrado el usuario que se quiere modificar'});
                                } else {
                                    res.status(200).send({employee: employeUpdateData});
                                }
                            }
                        });
                    });

                } else {
                    Employee.findByIdAndUpdate({_id: employeeId}, paramsUpdate, (err, employeUpdateData) => {
                        if(err) {
                            res.status(500).send({message: 'Error del servidor'});
                        } else {
                            if(!employeUpdateData) {
                                res.status(404).send({message: 'No se ha encontrado el usuario que se quiere modificar'});
                            } else {
                                res.status(200).send({employee: employeUpdateData});
                            }
                        }
                    });
                }
                
            } 
        }
    });
}

function createEmployee(req, res) {
    let employee = new Employee;

    const body = req.body;
    employee.name = body.name;
    employee.lastname = body.lastname;
    employee.dni = body.dni;
    employee.start_contract = body.start_contract;
    employee.end_contract = body.end_contract;
    employee.type_contract = body.type_contract;
    employee.bank_name = '';
    employee.back_holder = '';
    employee.back_number = '';
    employee.email = body.email.toLowerCase();
    employee.password = body.password;
    employee.role = body.role;
    employee.active = true;

    if(employee.password) {
        bcrypt.hash(body.password, null, null, function(err, hash) {
            employee.password = hash;
            
            if(employee.name != '' && employee.lastname != '' && employee.dni != '' && employee.start_contract != '' && 
                employee.end_contract != '' && employee.type_contract != '' && employee.email != '' && employee.password != '' && employee.role != '' && employee.active != ''){
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
            } else {
                res.status(404).send({message: 'No se ha podido crear el usuario'});
            }
        });
    } else {
        res.status(200).send({message: 'Introduce una contraseña.'});
    }
}

function deleteEmployee(req, res) {
    const employeId = req.params.id;
    
    Employee.findByIdAndDelete({_id: employeId}, (err, employeeDelete) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor'});
        } else {
            if(!employeeDelete) {
                res.status(404).send({message: 'No se ha encontrado ningun empleado'});
            } else {
                res.status(200).send({employee: employeeDelete});
            }
        }
    });
}





module.exports = {
    registrationEmployee,
    loginEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployeeById,
    createEmployee,
    deleteEmployee
};