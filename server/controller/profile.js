const express = require('express');
const router = express.Router();

const {authenticateToken} = require('../authorization/auth');
const userController = require('../db/user/controller');
const upload = require('../config/multerConfig');

router.post('/update/:id', authenticateToken, async(req, res) => {
    try{
        if(req.accountInfo._id === req.params.id){
            let data = await userController.updateUserInfo(req.params.id, req.body);
            res.json(data);
        } else {
            res.status(403).json({message: 'login required'});
        }
    } catch(err) {
        res.json(err);
    }
});

router.get('/profile/:id', authenticateToken, async(req, res) => {
    try{
        if(req.accountInfo._id == req.params.id){
            let data = await userController.getUserInfoByID(req.params.id);
            res.json(data);
        } else {
            res.status(403).json({message: 'login required'});
        }
    } catch(err) {
        res.json(err);
    }
})

router.delete('/delete/:id', authenticateToken, async(req, res) => {
    try{
        if(req.accountInfo._id == req.params.id){
            let data = await userController.deleteUser(req.params.id);
            res.json(data);
        } else {
            res.status(403).json({message: 'login required'});
        }
    } catch(err) {
        res.json(err);
    }
})
    
module.exports = router;