const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const upload = multer();

//config dotenv
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '..','.env')});

//config PORT
const PORT = process.env.PORT || 5000;

//include DB
const mongoose = require('./config/mongoose');
const routerConfig = require('./config/route');

//connect to DB
mongoose();

//use cors
app.use(cors());

// for parsing application/x-www-form-urlencoded & raw json
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
// app.use(upload.array()); 

//include API routes
app.use('/', routerConfig)

//use front-end build
app.use(express.static(path.resolve(__dirname, '..', 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

//listen request
app.listen(PORT, () => {
    console.log(`listen to client's request at port ${PORT}`);
});