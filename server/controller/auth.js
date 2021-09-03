const { Router } = require('express');
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

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)
        return res.sendStatus(401);
    else
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err)
                return res.sendStatus(403)
            req.user = user
            next();
        })
}

router.post('/signup', (req, res) => {
    res.json({message: "sth"});
    userController.createNewUser({accountInfo: req.body}).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
})

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA0NzY4NjB9.WeamuWbOscgCzpW0xe0KBFMSGhdNq1GOpzggX_L6i0U"
module.exports = router;