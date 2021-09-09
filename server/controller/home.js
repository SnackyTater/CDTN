const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userController = require('../db/user/controller');
const {authenticateToken} = require('../authorization/auth');

router.get('/recs', authenticateToken, async(req, res) => {
    try{
        let data = await userController.recommend(req.accountInfo._id);
        res.json(data);
    } catch(err) {
        res.json(err)
    }
});

//like
router.post('/swipe-right', async(req, res) => {
    try{
        let status = await userController.likeUser(req.body.userID, req.body.targetID);
        res.status(200).json(status)
    } catch(err) {
        throw(err);
    }
})

//nope
router.post('/swipe-left', async(req, res) => {
    try{
        let status = await userController.nopeUser(req.body.userID, req.body.targetID);
        res.status(200).json(status)
    } catch(err) {
        throw(err);
    }
})


module.exports = router;