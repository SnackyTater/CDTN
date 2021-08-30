const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log('connect to DB successfully');
    }).catch((err) => {
        console.log(err);
    })
    mongoose.Promise = global.Promise;
}
