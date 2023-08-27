const arquivoController = require ('./../controllers/arquivos');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/addArquivo',  arquivoController.addArquivo);
api.get('/getArquivos', AuthenticationControler.use, arquivoController.getArquivos);
api.get('/getArquivo/:id', AuthenticationControler.use, arquivoController.getArquivo);

module.exports = api;