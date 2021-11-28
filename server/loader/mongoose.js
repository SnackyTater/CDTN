const mongoose = require('mongoose');

module.exports = async() => {
    await mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.Promise = global.Promise;

    return mongoose;
}
