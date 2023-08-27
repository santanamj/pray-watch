const jwt = require ('jsonwebtoken');
const config = require ('../config/database');
const AuthenticationControler = require ('../controllers/user');
express = require ('express');

var api = express.Router();

api.post('/register', AuthenticationControler.register);
api.post('/login', AuthenticationControler.login);
api.get('/checkPhone/:phone', AuthenticationControler.checkPhone);
api.get('/profile', AuthenticationControler.use, AuthenticationControler.profile);
api.get('/profile/:id', AuthenticationControler.use, AuthenticationControler.profile);
api.put('/updateHorarioStatus', AuthenticationControler.updateHorarioStatus);
api.put('/updateHorarioStatusChange', AuthenticationControler.updateHorarioStatusChange);
api.put('/updatePedido', AuthenticationControler.updatePedido);
module.exports = api;