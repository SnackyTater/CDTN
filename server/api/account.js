    const { Router } = require('express');
const router = Router();

const {getAccountInfo, updateAccount, createAccount, login} = require('../controller/account');
const {createToken, authenticateToken} = require('../authorization/auth');
const {sendEmail} = require('../services/nodemailer')

router.get('/', authenticateToken, async(req, res) => {
    try{
        const {_id} = req.tokenInfo;
        const accountInfo = await getAccountInfo(_id);
        
        res.status(200).json(accountInfo);
    } catch(err) {
        res.status(404).send(err.message)
    }
})

router.post('/', async(req, res) => {
    try{
        const {accountInfo, userInfo} = req.body;
        const {_id} = await createAccount(accountInfo, userInfo);
        const token = await createToken(_id);

        res.status(200).json({access_token: token});
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.put('/', authenticateToken, async(req, res) => {
    try{
        const {_id} = req.tokenInfo;
        await updateAccount(_id, req.body);

        res.status(200).send('account updated successfully')
    } catch(err) {
        res.status(400).send(err.message);
    }
})

router.delete('/', authenticateToken, async(req, res) => {
    try{
        const {_id} = req.tokenInfo;
        await updateAccount(_id);

        res.status(200).send('account deleted successfully')
    } catch(err) {
        res.status(400).send(err.message);
    }
})

router.post('/login', async (req, res) => {
    try{
        const {identityVerification, password} = req.body;
        const userID = await login(identityVerification, password);
        const token = await createToken(userID);

        res.status(200).json({access_token: token});
    } catch (err) {
        res.status(404).json(err.message);
    }
})

router.post('/emailVerificate', async(req, res) => {
    try{
        const {email} = req.body;
        if(email){
            const checkAccountExist = await findAccount(email);
            if(!checkAccountExist){
                const nodeMailerRes = await sendEmail(mailOptions(email, code));
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

module.exports = router;