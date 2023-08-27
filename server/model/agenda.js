const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const moment = require('moment')
const momentTz = require('moment-timezone')
const now = moment();
const dateToStore = '2018-01-27 10:30'
moment().utcOffset(); // 60 minutes
const timeZone = 'America/Bahia' // 'UTC-03:00'
const ObjectId = mongoose.Schema.Types.ObjectId;
const agendaSchema = new Schema({
    hora: {type: String}, 
    datadia: {type: Array},  
    dia: {type: String},
    diaSemana:{type: String},
    pedido: {type: String},
    mes:{type: String},    
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name:{type: String},
    phone: {type: String},
    createdAt: { type: String, default: () => moment().format("DD-MM-YYYY, HH:mm:ss") }
    
});

module.exports = mongoose.model('Agenda', agendaSchema)