const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
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

const createToken = async (data) => {
    try{
        return await jwt.sign(data, process.env.ACCESS_TOKEN);
    } catch (err){
        return err;
    }
}

const verifyToken = async (token) => {
    await jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedData) => {
        if(err){ console.log(err) }
        return decodedData;
    })
}


module.exports = {
    authenticateToken,
    createToken,
    verifyToken,
}