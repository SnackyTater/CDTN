const express = require('express');
const router = express.Router();
const loginController = require('../DB/user/controller');

router.post('/login', (res, req) => {
    loginController.login(req.userName, req.password).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    })
});

module.exports = router;