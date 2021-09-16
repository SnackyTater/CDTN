const express = require('express');
const router = express.Router();
const fs = require('fs');

const {authenticateToken} = require('../authorization/auth');
const {getUserBioByID, updateUserBio, addUserImage} = require('../db/controller/user');
const {upload} = require('../config/multerConfig');
const cloudinary = require('../config/cloudinary');

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

router.post('/:id', [authenticateToken, upload.single("image")], async (req, res) => {
    try{
        if(req.accountInfo._id == req.params.id){
            //check if request have any image upload
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path);
                if(result){
                    const updateUserBio = await addUserImage(req.params.id, result.url)
                    res.json({cloudinary: result, userInfo: updateUserBio}); 
                } else {
                    res.json("sth is wrong")
                }
                fs.unlinkSync(req.file.path);
            }
            //check if request have any payload (userInfo....)
            if(req.body.payload){
                let payload = req.body.payload.replace(/\s+/g, ' ');
                const result = await updateUserBio(req.params.id, JSON.parse(payload))
                if(result){
                    res.status(200).json({message: 'update sucessfully', data: result});
                } else {
                    res.status(404).json({message: "no user was found with given ID"})
                }
            }
        } else {
            res.status(403).json({message: 'login required'});
        }
    } catch(err) {
        console.log(err)
        res.json(err.message)
    }
})
    
module.exports = router;