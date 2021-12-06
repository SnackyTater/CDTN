const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    participant: [{
            type: mongoose.Types.ObjectId,
            ref: 'user',
    }],
    log: [{
        from: { 
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
        time: {
            type: Date,
            default: Date.now
        },
        message:{ type: String }
    }]
})

const chat = mongoose.model('chat', chatSchema);
module.exports = chat;