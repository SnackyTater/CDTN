require('dotenv').config({path: `${__dirname}/configs/.env`});

const express = require('express');

//declare loader
const expressLoader = require('./loader/express');
const mongooseLoader =  require('./loader/mongoose');
const socketLoader = require('./loader/socket');

const expressServer = expressLoader(express);
const PORT = process.env.PORT || 5000;

expressServer.listen(PORT, () => {
    console.log(`express is now online at port ${PORT}`);
})

// socketLoader(io);

mongooseLoader().then(() => {
    console.log('mongoose is now online');
})

