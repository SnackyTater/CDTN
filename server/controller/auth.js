const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const userController = require('../db/user/controller');

const posts = [
    {
        username: 'tater',
        title: 'Post1'
    },{
        username: 'blyat',
        title: 'post2'
    }
]

router.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
})

router.post('/login', (req, res) => {
    const account = {name: req.body.name}
    const accessToken = jwt.sign(account, 'd3d0872a0de4d0a01945920f3cc044')
    res.json({access_token: accessToken})
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)
        return res.sendStatus(401);
    else
        jwt.verify(token, 'd3d0872a0de4d0a01945920f3cc044', (err, user) => {
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