require('dotenv').config({path: `${__dirname}/configs/.env`});

//declare loader
const expressLoader = require('./loader/express');
const mongooseLoader =  require('./loader/mongoose');
// const socketLoader = require('./socket');

// const cloudinary = require('./configs/cloudinary');
// console.log(cloudinary.config())

const expressServer = expressLoader();
const PORT = process.env.PORT || 5000;

expressServer.listen(PORT, () => {
    console.log(`express is now online at port ${PORT}`);
})

mongooseLoader().then(() => {
    console.log('mongoose is now online');
})

