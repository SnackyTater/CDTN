const express = require('express');
const router = express.Router();
const fs = require('fs');

const {authenticateToken} = require('../authorization/auth');
const {getUserBioByID, updateUserBio, addUserImage} = require('../db/controller/user');
const {upload} = require('../config/multerConfig');
const cloudinary = require('../config/cloudinary');
const { resolveSoa } = require('dns');

router.get('/:id', authenticateToken, async(req, res) => {
    try{
        if(req.accountInfo._id == req.params.id){
            let data = await getUserBioByID(req.params.id);
            res.status(200).json(data);
        } else {
            res.status(403).send('login required');
        }
    } catch(err) {
        res.status(400).send(err);
    }
})

router.put('/:id', authenticateToken, async(req, res) => {
    try{
        if(req.accountInfo._id == req.params.id){
            let query = await updateUserBio(req.params.id, req.body);
            res.status(200).json(query);
        } else {
            res.status(403).send('login required');
        }
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/image', [authenticateToken, upload.single("image")], async (req, res) => {
    try{
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(result);
            if(result){
                const updateUserBio = await addUserImage(req.accountInfo._id, result.url);
                console.log(updateUserBio);
                res.json({cloudinary: result, userInfo: updateUserBio}); 
            } 
            else throw TypeError('something is wrong when upload');
            //remove image from upload
            fs.unlinkSync(req.file.path);
        }
        else throw TypeError('please attach image file');
    } catch(err) {
        res.status(400).send(err);
    }
})


    
module.exports = router;