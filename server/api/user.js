const express = require('express');
const router = express.Router();

const {authenticateToken} = require('../authorization/auth');
const {getUser, getNotification, deleteNotification, updateUser} = require('../controller/user');

router.get('/', authenticateToken, async(req, res) => {
    try{
        let data = await getUser(req.tokenInfo.UID);
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(err);
    }
})

router.get('/notification', authenticateToken, async(req, res) => {
    try{
        let data = await getNotification(req.tokenInfo.UID);
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(err);
    }
})

router.put('/notification', authenticateToken, async(req, res) => {
    try{
        let data = await deleteNotification(req.tokenInfo.UID, req.body.notificationID);
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(err);
    }
})

router.put('/', authenticateToken, async(req, res) => {
    try{
        let query = await updateUser(req.tokenInfo.UID, req.body);
        res.status(200).json(query);
    }catch(err){
        res.status(400).send(err);
    }
})
    
module.exports = router;