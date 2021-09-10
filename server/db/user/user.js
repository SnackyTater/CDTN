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
        mobileNumber: {
            type: String,
            default: ''
        },
        gender: {
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
        block: [{
            _id: mongoose.Types.ObjectId,
        }]
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
            status: {
                type: Boolean,
                default: false
            }
        }
    },
    matchMakingStatus: {
        likes: [{ type: mongoose.Types.ObjectId }],
        nopes: [{type: mongoose.Types.ObjectId}],
        liked: [{type: mongoose.Types.ObjectId}],
        matches: [{ type: mongoose.Types.ObjectId }]
    },
})

User.index({"matchMakingConfig.location": '2dsphere'})
const user = mongoose.model('user', User);
module.exports = user;