const mongoose = require('mongoose');

//declare loader
const expressLoader = require('./express');
const mongooseLoader =  require('./mongoose');
// const socketLoader = require('./socket');

module.exports.init = async() => {
    const app = await expressLoader();
    app.listen()
    console.log('express is now online');
    
    await mongooseLoader();
    console.log('mongoose is now online');

    await socketLoader(socket);
}
