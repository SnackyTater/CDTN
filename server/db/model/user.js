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
            default: '',
            unique: [true, 'this mobile number has been used']
        },
        isVerify: {
            type: Boolean,
            default: false
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
            enum: ['male', 'female', 'unkown'],
            type: String,
            default: 'unknown',
        },
        description: {
            type: String,
            maxlength: 500,
            default: '',
        },
        passions: [{
            _id: mongoose.Types.ObjectId,
            name: String,
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
            coordinates: [Number],
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
    matchMakingStatus: {
        likes: [{ 
            type: mongoose.Types.ObjectId,
            ref: 'user',
        }],
        nopes: [{
            type: mongoose.Types.ObjectId,
            ref: 'user',
        }],
        liked: [{
            type: mongoose.Types.ObjectId,
            ref: 'user',
        }],
        matches: [{
            type: mongoose.Types.ObjectId,
            ref: 'user',
        }],
        block: [{
            type: mongoose.Types.ObjectId,
            ref: 'user',
        }]
    },
})

User.index({"matchMakingConfig.location": '2dsphere'})
const user = mongoose.model('user', User);
module.exports = user;