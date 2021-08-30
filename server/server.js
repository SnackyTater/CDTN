const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config({path: '../.env'});

const mongoose = require('./config/mongoose');
const routerConfig = require('./config/route');

//connect to DB
mongoose();

//use middlewares
app.use(cors());
app.use(express.json());

//include API routes
app.use('/', routerConfig)

//listen request
app.listen(process.env.PORT || 5000, () => {
    console.log("listen to client's request at port 10000");
});