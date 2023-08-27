const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require('moment')
moment().utcOffset();

const arquivoSchema = new Schema({
    title: { type: String },
    dataArquivo: { type: String },
    url: [{
        secure_url: String,
        values: Schema.Types.Mixed
    }],
    createdAt: { type: String, default: () => moment().format("DD-MM-YYYY, HH:mm:ss") }

});

module.exports = mongoose.model('Arquivo', arquivoSchema)