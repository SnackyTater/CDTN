const express = require('express');
const router = express.Router();
const fs = require('fs');

const {authenticateToken} = require('../authorization/auth');
const {updateUserInfo, getUserBioByID, updateUserBio, addUserImage} = require('../db/controller/user');
const {deleteAccount} = require('../db/controller/account');
const {upload} = require('../config/multerConfig');
const cloudinary = require('../config/cloudinary');

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
        console.log('blin')
        if(req.accountInfo._id == req.params.id){
            console.log('blin2')
            console.log(req.params.id)
            let data = await getUserBioByID(req.params.id);
            res.json(data);
        } else {
            res.status(403).json({message: 'login required'});
        }
    } catch(err) {
        res.json(err);
    }
})

router.delete('/:id', authenticateToken, async(req, res) => {
    try{
        if(req.accountInfo._id == req.params.id){
            let data = await deleteAccount()
            res.json(data);
        } else {
            res.status(403).json({message: 'login required'});
        }
    } catch(err) {
        res.json(err);
    }
})

router.post('/image', [authenticateToken, upload.single("image")], async (req, res) => {
    try{
        if(req.accountInfo._id == req.body.userID){
            const result = await cloudinary.uploader.upload(req.file.path);
            if(result){
                const updateUserBio = await addUserImage(req.body.userID, result.url)
                res.json({cloudinary: result, userInfo: updateUserBio}); 
            } else {
                res.json("sth is wrong")
            }
            fs.unlinkSync(req.file.path);
        } else {
            res.status(403).json({message: 'login required'});
        }
    } catch(err) {
        res.json(err.message)
    }
})
    
module.exports = router;