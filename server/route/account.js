const { Router } = require('express');
const router = Router();

const {login, register, findAccount, resetPassword} = require('../db/controller/account');
const {createToken} = require('../authorization/auth');
const {ageCalulator} = require('../utils/utils');

router.post('/login', async (req, res) => {
    try{
        const userInfo = await login(req.body.username, req.body.password);
        const holder = {
            accountInfo: userInfo.accountInfo,
            _id: userInfo._id
        }
        const token = await createToken(JSON.stringify(holder));
        res.status(200).json({access_token: token, userInfo: userInfo});
    } catch (err) {
        res.status(404).json(err);
    }
})

router.post('/signup', async(req, res) => {
    try{
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

//get accountInfo (for reset password)
router.get('/:identityVerification', async(req, res) => {
    try{
        const userAccount = await findAccount(req.params.identityVerification);
        if(userAccount != null){
            res.status(200).json(userAccount)
        } else {
            res.status(404).json({message: 'no user was found with given info'})
        }
    } catch(err) {
        res.json(err.message)
    }
})

router.post('resetPassword', async(req, res) => {
    try{
        const query = await resetPassword(req.body.accountInfo, req.body.newPassword);
        if(query != null){
            res.status(200).json({status: query, message: 'password updated successfully'})
        } else {
            res.status(418).json('help? Me no brew coffee cuz me teapot')
        }
    } catch(err) {

    }
})

module.exports = router;