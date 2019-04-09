'use strict'

var express = require('express');
var ProposalController = require('../controllers/proposal');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/add-proposal', md_auth.ensureAuth, ProposalController.addPorposal);
api.get('/get-proposals', md_auth.ensureAuth, ProposalController.getProposals);
api.put('/update-proposal', md_auth.ensureAuth, ProposalController.updateProposal);
api.delete('/delete-proposal/:id', md_auth.ensureAuth, ProposalController.deleteProposal);


module.exports = api;