const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const addressSchema = new Schema({
   
    logradouro: {type: String},
    numero: {type: Number},
    retirar: {type:String},
    bairro: {type: Schema.Types.ObjectId, ref: 'Bairro'},
    complemento: {type:String},
    userAddress: {type: String},  
    bairroAdress: {type: String},
    cost:{type: Number}    
});

module.exports = mongoose.model('Address', addressSchema)