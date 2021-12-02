const { Router } = require('express');
const router = Router();

const {updateAccount, createAccount, login, getAccountInfo, resetPassword, deleteAccount} = require('../controller/account');
const {getRequest, createRequest, deleteRequest} = require('../controller/resetRequest');
const {createToken, authenticateToken} = require('../authorization/auth');
const {sendEmail} = require('../services/nodemailer')

router.get('/', authenticateToken, async(req, res) => {
    try{
        const accountInfo = await getAccountInfo(req.tokenInfo.AID);
        
        res.status(200).json(accountInfo);
    } catch(err) {
        res.status(404).send(err.message)
    }
})

router.post('/', async(req, res) => {
    try{
        const {accountInfo, userInfo} = req.body;
        const {userID, accountID} = await createAccount(accountInfo, userInfo);
        const token = await createToken({userID, accountID});

        res.status(200).json({access_token: token});
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.put('/', authenticateToken, async(req, res) => {
    try{
        const result = await updateAccount(req.tokenInfo.AID, req.body);

        res.status(200).send(result);
    } catch(err) {
        res.status(400).send(err.message);
    }
})

router.delete('/', authenticateToken, async(req, res) => {
    try{
        const result = await deleteAccount(req.tokenInfo.AID);

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send(err.message);
    }
})

router.post('/login', async (req, res) => {
    try{
        const {identityVerification, password} = req.body;
        const {accountID, userID} = await login(identityVerification, password);
        const token = await createToken({accountID, userID});

        res.status(200).json({access_token: token});
    } catch (err) {
        res.status(404).json(err.message);
    }
})

router.post('/email-verificate', async(req, res) => {
    try{
        const {email} = req.body;
        if(email){
            const checkAccountExist = await findAccount(email);
            if(!checkAccountExist){
                const nodeMailerRes = await sendEmail({
                    email, 
                    option: {type: 'verificate'}
                });

                if(nodeMailerRes) res.status(200).json({code});
            } else {
                res.status(406).send('this email has been used for another account');
            }
        } 
        res.status(204).send('please enter email');
    }catch(err){
        res.status(400).send(err.message)
    }
})

router.post('/reset-password', async(req, res) => {
    try{
        const {email} = req.body;
        const {_id: requestID} = await createRequest(email);

        const result = await sendEmail({
            email: email,
            option: {
                type: 'reset-password',
                requestID: requestID
            }
        });

        res.status(200).json(result);
    } catch(err) {
        res.status(400).send(err.message);
    }
})

router.post('/reset-password/:id', async(req, res) => {
    try{
        const requestID = req.params.id;
        const newPassword = req.body;

        const request = await getRequest(requestID);
        await deleteRequest(requestID);
        const status = await updateAccount(request.id, newPassword);
        res.status(200).json(status);
    } catch(err) {
        res.status(400).send(err.message);
    }
})

module.exports = router;