const { Router } = require('express');
const router = Router();

const {login, register, findAccount, resetPassword} = require('../db/controller/account');
const {createToken} = require('../authorization/auth');
const {ageCalulator, generateCode} = require('../utils/utils');
const {mailOptions, sendEmail} = require('../config/nodemailer')

router.post('/login', async (req, res) => {
    try{
        const userInfo = await login(req.body.identityVerification, req.body.password);
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
        if (!age) throw 'must enter user date of birth';
        if(age < 18) throw 'you must be older than 18 to signup';
        else {
            let response = await register(req.body);
            res.json({message: 'account created successfully', data: response});
        }
    } catch (err) {
        res.json(err);
    }
})

router.post('/emailVerificate', async(req, res) => {
    try{
        if(req.body.email){
            const checkAccountExist = await findAccount(req.body.email);
            if(!checkAccountExist){
                let code = generateCode(99999);
                let mail = mailOptions(req.body.email, code);
                const nodeMailerRes = await sendEmail(mail);
                if(nodeMailerRes)
                    res.status(200).json({code: code, status: nodeMailerRes});
                else
                    res.json({message: 'idk, something wrong'});
            } else {
                res.status(406).json({message: "this email has been used for another account"});
            }
        } else {
            res.status(204).json({message: "please enter user's email"});
        }
    }catch(err){
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