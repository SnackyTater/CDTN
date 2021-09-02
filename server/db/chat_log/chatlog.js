const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatLog = new Schema({
    name: {
        type: String,
        default: '',
    },
    participant: [{
        user: { type: mongoose.Types.ObjectId }
    }],
    log: [{
        from: { type: mongoose.Types.ObjectId },
        content: {
            text: {
                type: String,
                default: '',
            }, 
            image: {
                type: String,
                default: '',
            }
        }
    }]
})

const tag = mongoose.model('Tags', Tag);
module.exports = tag;