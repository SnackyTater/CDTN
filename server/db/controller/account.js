const user = require('../model/user');

const register = async (accountInfo) => {
    try{
        console.log(accountInfo)
        let query = await user.create(accountInfo);
        console.log(query)
        return query;
    } catch(err) {
        if(err.code == 11000){
            if(err.keyValue.hasOwnProperty('accountInfo.username')){
                throw `${err.keyValue['accountInfo.username']} has been used`;
            }
            if(err.keyValue.hasOwnProperty('accountInfo.email')){
                throw `${err.keyValue['accountInfo.email']} has been used`;
            }
            if(err.keyValue.hasOwnProperty('accountInfo.mobileNumber')){
                throw `${err.keyValue['accountInfo.mobileNumber']} has been used`;
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
            if(query.accountInfo.isVerify == false) throw TypeError('account must be verified before logging in');;    //check if account has been verified ? (continue to check password) : (throw error)
            if(query.accountInfo.password == password) return query;
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
        const accountInfo = await user.findOne({
            $or:[
                {"accountInfo.username": identityVerification},
                {"accountInfo.emal": identityVerification},
                {"accountInfo.mobileNumber": identityVerification}
            ]
        }, 'accountInfo -_id')
        return accountInfo;
    } catch(err) {
        throw(err.message)
    }
}

const resetPassword = async (username, newPassword) => {
    try{
        const query = await user.updateOne({username: username}, {$set: {"accountInfo.password": newPassword}})
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