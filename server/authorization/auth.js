const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.status(401).send('invalid token');
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if(err){
                console.log(err.message)
                return res.status(403).send(err.message);
            }
                
            req.tokenInfo = data
            next();
        })
    }     
}

const createToken = async ({userID, accountID}) => {
    try{
        const data = {
            AID: accountID,
            UID: userID,
            iat: Date.now(),
            exp: Date.now() + (24*60*60*1000)
        }
        console.log(data);
        return await jwt.sign(data, process.env.ACCESS_TOKEN);
    } catch (err){
        return err;
    }
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN, (err, tokenInfo) => {
        if(err) throw new Error('fail to authenthicate token');
        return tokenInfo;
    });
}

module.exports = {
    authenticateToken,
    createToken,
    verifyToken
}