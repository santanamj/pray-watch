const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require('moment')
const momentTz = require('moment-timezone')
const now = moment();
const dateToStore = '2018-01-27 10:30'
moment().utcOffset(); // 60 minutes
const timeZone = 'America/Bahia' // 'UTC-03:00'

var utcDate = moment.utc().toDate();
productSchema  = mongoose.model('Product').schema;

const orderSchema = new Schema({
  numberOrder: {type: String},
 
  status:{
    type: String,
    enum: ['completo', 'aberto'],
    default: 'aberto'
  },
  IdProducts: Array,
  mesa: {type:String},
  clientName:{type: String},
  obs: {type: String},
  totalCart:{ type: Number},
  costFrete:{ type: Number},
  costProd:{ type: Number},
  formPay: {type: String},
  cliendId: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
  addressDelivery: {type: mongoose.Schema.Types.ObjectId,
    ref: 'Addresses'},
  pagamento:{
    type: String,
    enum: ['pago', 'pagamentoAberto'],
    default: 'pagamentoAberto'
  },
  tipoOrder:{
    type:String,
    enum:['loja', 'delivery', 'retirar'],
    default:'loja'
  },
  
  createdAt: { type: Date, default: new Date(Date.now()) },  
    orders:
  [{
   productId:Array,
   _id: Array,
    sabores:Array,
    quantity:{type:Number},    
    totalCart:{ type: String},
    product: productSchema
  }]
  

    
        
});
module.exports = mongoose.model('Order', orderSchema);