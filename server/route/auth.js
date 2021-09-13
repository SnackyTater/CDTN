const { Router } = require('express');
const router = Router();

const {login, register} = require('../db/controller/account');
const {createToken} = require('../authorization/auth');
const {ageCalulator} = require('../utils/utils');

router.post('/login', async (req, res) => {
    try{
        let userInfo = await login(req.body.username, req.body.password);
        let holder = {
            accountInfo: userInfo.accountInfo,
            _id: userInfo._id
        }
        let token = await createToken(JSON.stringify(holder));
        res.status(200).json({access_token: token, userInfo: userInfo});
    } catch (err) {
        res.status(404).json(err);
    }
})

router.post('/signup', async(req, res) => {
    try{
        console.log('a')
        let age = ageCalulator(new Date(req.body.userInfo.DateOfBirth))
        console.log(age)
        if(age < 18){
            throw 'you must be older than 18 to signup';
        } else {
            let response = await register(req.body);
            res.json({message: 'account created successfully', data: response});
        }
    } catch (err) {
        res.json(err);
    }
})

module.exports = router;