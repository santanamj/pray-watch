const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const moment = require('moment')
const momentTz = require('moment-timezone')
const now = moment();
const dateToStore = '2018-01-27 10:30'
moment().utcOffset(); // 60 minutes
const timeZone = 'America/Bahia' // 'UTC-03:00'
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new Schema({
    title: {type: String},
    description: {type: String},
    
    subId: Array,
    tipoPizza: Array,
    price: {type:Number},
    createdAt: { type: String, default: () => moment().format("DD-MM-YYYY, HH:mm:ss") },
    url: [{
      url: String,
      values: Schema.Types.Mixed
  }],
    fieldname: { type: String },
   originalname: { type: String },
  encoding: { type: String },
  mimeptype: { type: String },
  destination: { type: String },
  filename: { type: String },
  path: { type: String },
  size: { type: Number }
},
  {  toJSON: {virtuals: true},
  toObjetic: {virtuals: true}
 });
 productSchema.virtual('subproducts',{
     ref: 'Subproducts',
     localField:'_id',
     foreignField:'product'
     });


module.exports = mongoose.model('Product', productSchema);