const express = require('express');
const router = express.Router();
const userController = require('../db/user/controller');
const upload = require('../config/multerConfig');

router.post('/update/:id', async(req, res) => {
    try{
        let data = await userController.updateUserInfo(req.params.id, req.body);
        res.json(data);
    } catch(err) {
        res.json(err);
    }
});
    
module.exports = router;