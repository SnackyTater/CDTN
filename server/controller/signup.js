const express = require('express');
const router = express.Router();
const userController = require('../db/user/controller');
const multer = require('../config/multerConfig');


router.post('/signup', (req, res) => {
    userController.createNewUser(req.body).then((data) => {
        console.log('save to DB successfully');
    }).catch((err) => {
        console.log(err.message);
    })
});
    
module.exports = router;