const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'this user name has been used'],
        minlength: 5
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 8,
    },
    email:{
        type: String,
        required :[true, 'email is required'],
        unique: [true, 'this email has been used']
    },
    mobile: {
        type: String,
        unique: [true, 'this mobile number has been used'],
        default: '',
    }
})

const account = mongoose.model('account', accountSchema);
module.exports = account;