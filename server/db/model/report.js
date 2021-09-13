const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reports = new Schema({
    accuser:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    accused:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    status:{
        type: String,
        default:'pending',
        enum: ['solved', 'reject', 'pending'],
    },
    reportDescription:{
        type: String,
        default:'',
        maxlength: 300,
    },
})

const Reports = mongoose.model('Reports', reports);
module.exports = Reports;