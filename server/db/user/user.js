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
            required: [true, 'password is required'],
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
            default: '',
        },
        DateOfBirth: {
            type: Date,
        },
        gender: {
            type: String,
        },
        description: {
            type: String,
            maxlength: 500
        },
        passions: [{
            _id: mongoose.Types.ObjectId,
            name: String,
        }],
        block: [{
            _id: mongoose.Types.ObjectId,
        }]
    },
    matchMakingConfig:{
        location: {
            longitude: Number,
            latitude: Number
        },
        gender: String,
        age: {
            from: {
                type: Number,
                default: 18,
            },
            to: {
                type: Number,
                default: 31,
            }
        },
        zoneLimit:{
            diameter: {
                type: Number,
                default: 80000,
            },
            status: {
                type: Boolean,
                default: false
            }
        }
    },
    matchMakingStatus: {
        likes: [{ type: mongoose.Types.ObjectId }],
        nopes: [{type: mongoose.Types.ObjectId}],
        matches: [{ type: mongoose.Types.ObjectId }]
    },
})

const user = mongoose.model('user', User);
module.exports = user;