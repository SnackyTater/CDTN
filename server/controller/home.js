const express = require('express');
const router = express.Router();

const userController = require('../db/user/controller');

//when logged in
router.get('/home', (req, res) => {
    //return array of match card
    res.json({message: 'sth'});
});

router.post('/swipe-right', (req, res) => {
    console.log('blin')
    userController.likeUser(req.body.userID, req.body.targetID).then((data) => {
        res.json("added");
    }).catch((err) => {
        console.log(err);
    })
})


module.exports = router;