const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    accountInfo: {
        username: {
            type: String,
            required: [true, 'username is required'],
            unique: [true, 'this user name has been used'],
            minlength: 5
        },
        email:{
            type: String,
            required :[true, 'email is required'],
            unique: [true, 'this email has been used for another account']
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
    },
    userInfo: {
        profileImage: {
            type: String,
            default: '../uploads/defaultProfile/profile.png',
        },
        fullName: {
            type: String,
            required: true
        },
        DateOfBirth: {
            type: Date,
        },
        like: [{
            id: mongoose.Types.ObjectId,
        }],
        match: [{
            id: mongoose.Types.ObjectId,
        }],
    },
    
    
})

const account = mongoose.model('Account', User);
module.exports = account;