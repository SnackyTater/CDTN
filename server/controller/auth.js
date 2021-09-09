const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const userController = require('../db/user/controller');
const auth = require('../authorization/auth');
const {ageCalulator} = require('../utils/utils');

router.post('/login', async (req, res) => {
    try{
        let userInfo = await userController.checkLogin(req.body);
        let holder = {
            accountInfo: userInfo.accountInfo,
            _id: userInfo._id
        }
        let token = await auth.createToken(JSON.stringify(holder));
        res.status(200).json({access_token: token, userInfo: userInfo});
    } catch (err) {
        res.status(404).json(err);
    }
})

router.post('/signup', async(req, res) => {
    try{
        let age = ageCalulator(new Date(req.body.userInfo.DateOfBirth))

        if(age < 18){
            throw 'you must be older than 18 to signup';
        } else {
            let response = await userController.createNewUserAccount(req.body);
            res.json({message: 'account created successfully', data: response});
        }
    } catch (err) {
        res.json(err);
    }
})

module.exports = router;