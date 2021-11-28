const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    account: {
        type: mongoose.Types.ObjectId,
        ref: 'account'
    },
    info: {
        profileImage: [{
            imagePublicID: {
                type: String,
                default: ''
            },
            imageURL: {
                type: String,
                default: ''
            }
        }],
        fullName: {
            type: String,
            default: '',
        },
        DateOfBirth: {
            type: Date,
            default: Date.now(),
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
            ref: 'passion'
        }],
        relationship: {
            status: {
                enum: ['single', 'dating', 'complicated'],
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
    notification: [{
        content: {
            message: {
                type: String,
                default: '',
            },
            imageUrl: {
                type: String,
                default: '',
            }
        },
        time: {
            type: Date,
            default: Date.now(),
        }
    }],
    matchMaking: {
        config: {
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
        status: [{
            _id: false,
            id: {
                type: mongoose.Types.ObjectId,
                ref: 'user',
            },
            type: {
                type: String,
                enum: ['like', 'match', 'nope'],
            }
        }]
    }
})

userSchema.index({"matchMakingConfig.location": '2dsphere'})
const user = mongoose.model('user', userSchema);
module.exports = user;