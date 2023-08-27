const addressController = require ('./../controllers/address');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newAddress', AuthenticationControler.use, addressController.newAddress);
api.get('/getmyAddress', AuthenticationControler.use, addressController.getmyAddress);
api.get('/getAddress', AuthenticationControler.use, addressController.getAddress);
api.get('/oneAddresses/:id', AuthenticationControler.use, addressController.oneAddresses);

module.exports = api;