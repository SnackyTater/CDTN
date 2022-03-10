const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchMakingSchema = new Schema({
    user1: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    user2: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    type: {
        type: String,
        enum: ['like', 'pass', 'match'],
        default: ''
    }
})

const user = mongoose.model('match-making', matchMakingSchema);
module.exports = user;