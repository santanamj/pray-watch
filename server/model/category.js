const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const moment = require('moment')
const momentTz = require('moment-timezone')
const now = moment();
const dateToStore = '2018-01-27 10:30'
moment().utcOffset(); // 60 minutes
const timeZone = 'America/Bahia' // 'UTC-03:00'

const categorySchema = new Schema({
    title: {type: String},
    description: {type: String},
    url: [{
        secure_url: String,
        values: Schema.Types.Mixed
    }],
    
    createdAt: { type: String, default: () => moment().format("DD-MM-YYYY, HH:mm:ss") },
    
},
{  toJSON: {virtuals: true},
 toObjetic: {virtuals: true}
});
categorySchema.virtual('products',{
    ref: 'Product',
    localField:'_id',
    foreignField:'category'
    });

module.exports = mongoose.model('Category', categorySchema)