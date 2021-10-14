const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(401);
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if(err)
                return res.sendStatus(403)
            req.accountInfo = data
            next();
        })
    }     
}

const createToken = async (id) => {
    try{
        const data = {
            _id: id,
            iat: Date.now(),
            exp: Date.now() + (24*60*60*1000)
        }
        return await jwt.sign(data, process.env.ACCESS_TOKEN);
    } catch (err){
        return err;
    }
}

module.exports = {
    authenticateToken,
    createToken,
}