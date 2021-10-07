const { Router, response } = require('express');
const router = Router();

const {login, register, findAccount, resetPassword, updateAccount} = require('../db/controller/account');
const {createToken} = require('../authorization/auth');
const {ageCalulator, generateCode} = require('../utils/utils');
const {mailOptions, sendEmail} = require('../config/nodemailer')

router.post('/login', async (req, res) => {
    try{
        //get user data from DB
        const {identityVerification, password} = req.body
        const user = await login(identityVerification, password);

        //create token
        const tokenInfo = { accountInfo: user.accountInfo, _id: user._id }
        const token = await createToken(JSON.stringify(tokenInfo));

        //return user info
        res.status(200).json({access_token: token});
    } catch (err) {
        console.log(err);
        res.status(404).json({message: err.message});
    }
})

router.post('/signup', async(req, res) => {
    try{
        //check if user age < 18
        const age = ageCalulator(new Date(req.body.userInfo.DateOfBirth))
        if (!age) throw TypeError('user must enter date of birth');
        if(age < 18) throw TypeError('user must be older than 18 to sign up');

        //if user is > 18
        else {
            const {accountInfo, _id} = await register(req.body);
            const token = await createToken(JSON.stringify({accountInfo, _id}));

            res.status(200).json({access_token: token});
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.post('/emailVerificate', async(req, res) => {
    try{
        const {email} = req.body;
        if(email){
            const checkAccountExist = await findAccount(email);
            if(!checkAccountExist){
                let code = generateCode(99999);
                const nodeMailerRes = await sendEmail(mailOptions(email, code));
                if(nodeMailerRes)
                    res.status(200).json({code});
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
        res.status(400).send(err.message)
    }
})

router.put('/:identityVerification', async(req, res) => {
    try{
        const query = await updateAccount(req.params.identityVerification, req.body);
        res.status(200).json(query);
    } catch(err) {
        res.status(400).send(err.message);
    }
})

router.post('resetPassword', async(req, res) => {
    try{
        const query = await resetPassword(req.body.accountInfo, req.body.newPassword);
        if(query != null){
            res.status(200).json({status: query, message: 'password updated successfully'})
        } else {
            res.status(418).send('help? Me no brew coffee cuz me teapot')
        }
    } catch(err) {

    }
})

module.exports = router;