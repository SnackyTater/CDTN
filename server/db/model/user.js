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
        mobileNumber: {
            type: String,
            unique: [true, 'this mobile number has been used'],
            default: '',
        }
    },
    userInfo: {
        profileImage: [{
            type: String,
            default: '',
        }],
        fullName: {
            type: String,
            default: '',
        },
        DateOfBirth: {
            type: Date,
        },
        gender: {
            enum: ['male', 'female', 'unknown'],
            type: String,
            default: 'unknown',
        },
        description: {
            type: String,
            maxlength: 500,
            default: '',
        },
        passions: [{
            type: mongoose.Types.ObjectId,
            ref: 'passions'
        }],
        relationship: {
            status: {
                enum: ['single', 'married', 'dating', 'complicated'],
                type: String,
                default: 'single',
            },
            related: {
                type: mongoose.Types.ObjectId,
                ref: 'user',
                default: null,
            },
            since:{
                type: Date,
                default: Date.now,
            }
        }
    },
    matchMakingConfig:{
        location: {
            type: {
                type: String,
                default: "Point",
            },
            coordinates: {
                type: [Number],
                default: [0,0]
            }
        },
        gender: {
            enum: ['male', 'female', 'both'],
            type: String,
            default: 'both',
        },
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
            isOn: {
                type: Boolean,
                default: true
            }
        }
    },
    matchMakingStatus: [{
        _id: false,
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
        type: {
            type: String,
            enum: ['like', 'match', 'nope'],
        },
        status: {
            type: String,
            enum: ['confirmed', 'unconfirmed']
        }
    }],
    chatLog:[{
        type: mongoose.Types.ObjectId,
        ref: 'chatLogs'
    }]
})

User.index({"matchMakingConfig.location": '2dsphere'})
const user = mongoose.model('user', User);
module.exports = user;