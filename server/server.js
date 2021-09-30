//require server lib
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socketIO = require('./config/socketIO');

//require other lib
const path = require('path');

//config dotenv
require('dotenv').config({path: path.resolve(__dirname, '..','.env')});

//include middleware lib
const cors = require('cors');
const routerConfig = require('./config/route');

//include db
const mongoose = require('./config/mongoose');

//config PORT
const PORT = process.env.PORT || 5000;

//connect to DB
mongoose();

//use middleware
app.use(cors());
app.use(express.json());    //parsing raw json
app.use(express.urlencoded({ extended: true })); //parsing application/x-www-form-urlencoded
app.use('/', routerConfig);

//use front-end build
app.use(express.static(path.resolve(__dirname, '..', 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..','client/build', 'index.html'));
})

//setup socket io
socketIO(io);

//setup server to listen request
server.listen(PORT, () => {
    console.log(`listen to client's request at port ${PORT}`);
});