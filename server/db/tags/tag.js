const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = new Schema({
    name: {
        type: String,
        default: '',
    }
})

const tag = mongoose.model('Tags', Tag);
module.exports = tag;