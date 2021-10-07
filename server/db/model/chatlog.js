const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatLog = new Schema({
    name: {
        type: String,
        default: '',
    },
    participant: [{
            type: mongoose.Types.ObjectId,
            ref: 'user',
    }],
    log: [{
        from: { type: mongoose.Types.ObjectId },
        time: {
            type: Date,
            default: Date.now
        },
        message:{ type: String }
    }]
})

const ChatLog = mongoose.model('chatLogs', chatLog);
module.exports = ChatLog;