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
            console.log(data);
            console.log('blin1');
            req.data = data
            next();
        })
    }     
}

const createToken = async (data) => {
    try{
        return await jwt.sign(data, process.env.ACCESS_TOKEN);
    } catch (err){
        return err;
    }
}

module.exports = {
    authenticateToken,
    createToken,
}