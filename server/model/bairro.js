const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;

const bairroSchema = new Schema({
    title: {type: String},
    cost: {type: Number},       
},
{  toJSON: {virtuals: true},
 toObjetic: {virtuals: true}
});
bairroSchema.virtual('addresses',{
    ref: 'Address',
    localField:'_id',
    foreignField:'bairro'
    });

module.exports = mongoose.model('Bairro', bairroSchema)