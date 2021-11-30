const express = require('express');
const router = express.Router();

const {authenticateToken} = require('../authorization/auth');
const {getUserInfo, getNotification, deleteNotification, updateUserInfo} = require('../controller/user');

router.get('/', authenticateToken, async(req, res) => {
    try{
        let data = await getUserInfo(req.tokenInfo._id);
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(err);
    }
})

router.get('/notification', authenticateToken, async(req, res) => {
    try{
        let data = await getNotification(req.tokenInfo._id);
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(err);
    }
})

router.put('/notification', authenticateToken, async(req, res) => {
    try{
        let data = await deleteNotification(req.tokenInfo._id, req.body.notificationID);
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(err);
    }
})

router.put('/', authenticateToken, async(req, res) => {
    try{
        let query = await updateUserInfo(req.tokenInfo._id, req.body);
        res.status(200).json(query);
    }catch(err){
        res.status(400).send(err);
    }
})
    
module.exports = router;