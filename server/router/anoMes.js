const mesController = require ('./../controllers/mes');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/addMes',  mesController.newMes);
api.post('/addDay', mesController.newDay);
api.post('/horaDay', mesController.newHora);
api.post('/addAgenda', mesController.addAgenda);
api.get('/getAgenda/:dia', mesController.getAgenda);
api.get('/getAgendaDay/:dia', mesController.getAgendaDay);
api.get('/agendaHoracoes', mesController.agendaHoracoes);
api.get('/agendaUser/:id', mesController.agendaUser);
api.get('/getAgendaPray', mesController.getAgendaPray);
api.delete('/deleteAgenda/:id', mesController.deleteAgenda);
api.put('/agendaPedido', mesController.agendaPedido)
api.get('/getAgendaRelatorio', mesController.getAgendaRelatorio)
module.exports = api;