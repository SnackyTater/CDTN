const user = require('../model/user');

const register = async (accountInfo) => {
    try{
        console.log(accountInfo)
        let query = await user.create(accountInfo);
        return query;
    } catch(err) {
        if(err.code == 11000){
            if(err.keyValue.hasOwnProperty('accountInfo.username')){
                throw `${err.keyValue['accountInfo.username']} has been used`;
            }
            if(err.keyValue.hasOwnProperty('accountInfo.email')){
                throw `${err.keyValue['accountInfo.email']} has been used`;
            }
        } else {
            throw err.message;
        }
    }
}

const login = async (username, password) => {
    try{
        const query = await user.findOne({'accountInfo.username': username});
        if(query != null){
            console.log('blin 2.1')
            const userInfo = query.toJSON();
            console.log('blin 2.2')
            console.log(userInfo.accountInfo.password == password)
            if(userInfo.accountInfo.isVerify == false) throw TypeError('account must be verified before logging in');;    //check if account has been verified ? (continue to check password) : (throw error)
            if(userInfo.accountInfo.password == password) return userInfo;
            else throw TypeError('wrong password');
        } else {
            throw TypeError('wrong username');
        }
    } catch (err) {
        throw(err.message);
    }
}

const findAccount = async(identityVerification) => {
    try{
        const query = await user.findOne({
            $or:[
                {"accountInfo.username": identityVerification},
                {"accountInfo.emal": identityVerification},
                {"accountInfo.mobileNumber": identityVerification}
            ]
        })
        if(query != null) return query
        else throw 'no user was found with given info'
    } catch(err) {
        throw(err.message)
    }
}

const resetPassword = async (userID, newPassword) => {
    try{
        const query = await user.updateOne({_id: userID}, {$set: {"accountInfo.password": newPassword}})
        //xem lại xem là update tn là đc hay k đc (chứ đcm quên cmnr)
        return {status: query, message: "update new password successfully"}
    } catch(err) {
        throw(err.message)
    }
}

const deleteAccount = async (userID) => {
    try{
        const query = await user.deleteOne({_id: userID});
        if(query != null) return {message: `delete user ${userID} successfully`}
        else throw 'no user was found with given ID'
    } catch(err) {
        throw (err.message)
    }
}

module.exports = {
    register,
    login,
    resetPassword,
    findAccount,
    deleteAccount,
}