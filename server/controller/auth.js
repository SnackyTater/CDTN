const { Router, response } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const userController = require('../db/user/controller');
const auth = require('../authorization/auth');

router.post('/login', async (req, res) => {
    try{
        let userInfo = await userController.checkLogin(req.body);
        let accountInfo = userInfo.toJSON().accountInfo;
        let token = await auth.createToken(accountInfo);
            res.status(200).json({access_token: token, userInfo: userInfo});
    } catch (err) {
        res.status(404).json(err);
    }
})

router.post('/signup', async(req, res) => {
    try{
        let response = await userController.createNewUserAccount(req.body);
        res.json({message: 'account created successfully', data: response});
    } catch (err) {
        res.json(err);
    }
})

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA0NzY4NjB9.WeamuWbOscgCzpW0xe0KBFMSGhdNq1GOpzggX_L6i0U"
module.exports = router;