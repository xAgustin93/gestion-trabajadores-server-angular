'use strict'

var fs = require('fs');
var path = require('path');
var jwt = require('../services/jwt');

var Proposal = require('../models/proposal');


function addPorposal(req, res) {
    
    let proposal = new Proposal();
    
    const body = req.body;
    proposal.title = body.title;
    proposal.description = body.description;
    proposal.like = 0;
    proposal.dislike = 0;
    proposal.date = new Date();
    proposal.active = false;
    proposal.employees_action = null;

    proposal.save((err, proposalStore) => {
        if(err) {
            res.status(500).send({message: 'Error de servidor.'});
        } else {
            if(!proposalStore) {
                res.status(500).send({message: 'No se ha podido crear la nueva propuesta.'});
            } else {
                res.status(200).send({proposal: proposalStore});
            }
        }
    });
}

function getProposals(req, res) {
    var find = Proposal.find().sort({date: 'desc'});

    find.exec((err, proposals) => {
        if(err){
            res.status(500).send({message: 'Error de servidor.'});
        } else {
            if(!proposals){
                res.status(404).send({message: 'No se ha encontrado ninguna propuesta.'});
            } else {
                res.status(200).send({proposals});
            }
        }
    });
}

function updateProposal(req, res) {
    let proposalId = req.body._id;

    const params = req.body;

    Proposal.findByIdAndUpdate({_id: proposalId}, (err, proposalUpdate) => {
        if(err) {

        } else {
            if(!proposalUpdate) {

            } else {
                
            }
        }
    })


}


module.exports = {
    addPorposal,
    getProposals,
    updateProposal
};