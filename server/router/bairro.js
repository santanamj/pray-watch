const bairroController = require ('./../controllers/bairro');
const express = require ('express');

var api = express.Router();

api.post('/newBairro', bairroController.newBairro);
api.get('/getBairro', bairroController.getBairro);


module.exports = api;