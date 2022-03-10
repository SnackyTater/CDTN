const express = require('express');
const router = express.Router();

const {recommend, toggleLikeUser, toggleNopeUser, getMatches, dummy} = require('../controller/matchMaking');
const {authenticateToken} = require('../authorization/auth');

router.get('/recs', authenticateToken, async(req, res) => {
    try{
        let data = await recommend(req.tokenInfo.UID);
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get('/get-matches', authenticateToken, async(req, res) => {
    try{
        const data = await getMatches(req.tokenInfo.UID);
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(err);
    }
})

//like
router.post('/like', authenticateToken, async(req, res) => {
    try{
        let status = await toggleLikeUser(req.tokenInfo.UID, req.body.targetID);
        console.log(status);
        res.status(200).json(status);
    } catch(err) {
        console.log('message', err.message);
        res.status(400).send(err.message);
    }
})

router.post('/unmatch', authenticateToken, async(req, res) => {
    try{
        let status = await unmatch();
    } catch(err) {
        res.status(400).send(err.message);
    }
})

//nope
router.post('/nope', authenticateToken, async(req, res) => {
    try{
        const status = await toggleNopeUser(req.tokenInfo.UID, req.body.targetID);
        res.status(200).json(status);
    } catch(err) {
        res.json(err);
    }
})

// router.post('/dummy', async(req, res) => {
//     try{
//         await dummy();
//     }catch(err){
//         console.log(err);
//     }
// })

module.exports = router;