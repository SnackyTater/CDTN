const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    id: {
        type: mongoose.Types.ObjectId,
        default: ''
    },
    expire: {
        type: Date,
        default: Date.now() + (3*60*60*1000),
    }
})

const request = mongoose.model('reset-request', requestSchema);
module.exports = request;