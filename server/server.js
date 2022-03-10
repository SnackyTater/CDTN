require('dotenv').config({path: `${__dirname}/configs/.env`});

const express = require('express');
const http = require('http');
const socketIO = require('socket.io')

//declare loader
const expressLoader = require('./loader/express');
const mongooseLoader =  require('./loader/mongoose');
const socketLoader = require('./loader/socket');

//setup server
const expressConfig = expressLoader(express);
const server = http.createServer(expressConfig);

//setup socket
const io = socketIO(server, {
    cors: {
        origin: '*'
    }
});

const PORT = process.env.PORT || 5000;

//init server, socket, db(mongodb)
server.listen(PORT, () => {
    console.log(`server is now online at port ${PORT}`);
})

socketLoader(io);
console.log(`socket is online at port ${PORT}`);

mongooseLoader().then(() => {
    console.log('mongoose is now online');
})

module.exports.io = io;

