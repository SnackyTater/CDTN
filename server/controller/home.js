const express = require('express');
const router = express.Router();

const userController = require('../db/user/controller');

router.get('/recs', (req, res) => {
    //return array of match card
    res.json({message: 'sth'});
});

router.post('/swipe-right', async(req, res) => {
    try{
        let status = await userController.likeUser(req.body.userID, req.body.targetID);
        res.status(200).json(status)
    } catch(err) {
        throw(err);
    }
})

router.post('/swipe-left', async(req, res) => {
    try{
        let status = await userController.nopeUser(req.body.userID, req.body.targetID);
        res.status(200).json(status)
    } catch(err) {
        throw(err);
    }
})


module.exports = router;