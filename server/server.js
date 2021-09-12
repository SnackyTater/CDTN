const express = require('express');
const app = express();
const cors = require('cors');

//config dotenv
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '..','.env')});

//include DB
const mongoose = require('./config/mongoose');
const routerConfig = require('./config/route');

//connect to DB
mongoose();

//use middlewares
app.use(cors());
app.use(express.json());

//include API routes
app.use('/', routerConfig)

//use front-end build
app.use(express.static(path.resolve(__dirname, '..', 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

//listen request
app.listen(process.env.PORT || 5000, () => {
    console.log("listen to client's request at port 10000");
});