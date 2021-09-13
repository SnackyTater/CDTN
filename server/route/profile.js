const express = require('express');
const router = express.Router();

const {authenticateToken} = require('../authorization/auth');
const {updateUserInfo, getUserInfoByID} = require('../db/controller/user');
const upload = require('../config/multerConfig');

router.post('/update/:id', authenticateToken, async(req, res) => {
    try{
        if(req.accountInfo._id === req.params.id){
            let data = await updateUserInfo(req.params.id, req.body);
            res.json(data);
        } else {
            res.status(403).json({message: 'login required'});
        }
    } catch(err) {
        res.json(err);
    }
});

router.get('/:id', authenticateToken, async(req, res) => {
    try{
        if(req.accountInfo._id == req.params.id){
            let data = await getUserInfoByID(req.params.id);
            res.json(data);
        } else {
            res.status(403).json({message: 'login required'});
        }
    } catch(err) {
        res.json(err);
    }
})
    
module.exports = router;