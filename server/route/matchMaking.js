const express = require('express');
const router = express.Router();

const {recommend, toggleLikeUser, toggleNopeUser, toggleBlockUser} = require('../db/controller/matchMaking');
const {authenticateToken} = require('../authorization/auth');

router.get('/recs', authenticateToken, async(req, res) => {
    try{
        let data = await recommend(req.accountInfo._id);
        res.json(data);
    } catch(err) {
        res.json(err);
    }
});

//like
router.post('/like', authenticateToken, async(req, res) => {
    try{
        if(req.accountInfo._id == req.body.userID){
            let status = await toggleLikeUser(req.body.userID, req.body.targetID);
            res.status(200).json(status);
        } else {
            res.status(403).json({"message": 'login required'})
        }
    } catch(err) {
        res.json(err);
    }
})

//nope
router.post('/nope', authenticateToken, async(req, res) => {
    try{
        if(req.accountInfo._id == req.body.userID){
            let status = await toggleNopeUser(req.body.userID, req.body.targetID);
            res.status(200).json(status)
        } else {
            res.status(403).json({"message": 'login required'});
        }
    } catch(err) {
        res.json(err);
    }
})

//block
router.post('/block', authenticateToken, async(req, res) => {
    try{
        if(req.accountInfo._id == req.body.userID){
            let status = await toggleBlockUser(req.body.userID, req.body.targetID);
            res.status(200).json(status)
        } else {
            res.status(403).json({"message": 'login required'});
        }
    } catch(err) {
        res.json(err);
    }
})


module.exports = router;