const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Passion = new Schema({
    name: {
        type: String,
        default: '',
    }
})

const passion = mongoose.model('passion', Passion);
module.exports = passion;
