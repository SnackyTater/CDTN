const user = require('../model/user');

const register = async (account) => {
    try{
        let query = await user.create({"accountInfo": account.accountInfo, "userInfo": account.userInfo});
        return query;
    } catch(err) { 
        if(err.code == 11000){
            if(err.keyValue.hasOwnProperty('accountInfo.username')){
                throw TypeError(`username ${err.keyValue['accountInfo.username']} has been used`);
            }
            if(err.keyValue.hasOwnProperty('accountInfo.email')){
                throw TypeError(`email ${err.keyValue['accountInfo.email']} has been used`);
            }
            if(err.keyValue.hasOwnProperty('accountInfo.mobileNumber')){
                throw TypeError(`mobile number ${err.keyValue['accountInfo.mobileNumber']} has been used`);
            }
        } else {
            throw TypeError(err.message);
        }
        throw TypeError(err);
    }
}

const login = async (userIdentityVerification, password) => {
    try{
        const userInfo = await user.findOne({
            $or:[
                {"accountInfo.username": userIdentityVerification}, 
                {"accountInfo.mobileNumber": userIdentityVerification}, 
                {"accountInfo.email": userIdentityVerification}
            ]
        });
        
        //if find atleast 1 user                                   
        if(userInfo != null){
            if(userInfo.accountInfo.password == password) return userInfo;
            else throw new Error('wrong password');
        } else {
            throw new Error('wrong username');
        }
    } catch (err) {
        throw new Error(err);
    }
}

const findAccount = async(identityVerification) => {
    try{
        const accountInfo = await user.findOne({
            $or:[
                {"accountInfo.username": identityVerification},
                {"accountInfo.email": identityVerification},
                {"accountInfo.mobileNumber": identityVerification}
            ]
        }, 'accountInfo -_id')
        //send verification form to identify if its real user or not
        return accountInfo;
    } catch(err) {
        throw TypeError(err);
    }
}

const updateAccount = async(id, newAccountInfo) => {
    try{
        const query = await user.findByIdAndUpdate(id, {$set: {accountInfo: newAccountInfo}}, {new: true, fields:{"accountInfo": 1}});
        if(query) return query;
        else throw TypeError('no user was found with given ID');
    }catch(err){
        throw TypeError(err)
    }
}

const resetPassword = async (username, newPassword) => {
    try{
        const query = await user.updateOne({username: username}, {$set: {"accountInfo.password": newPassword}})
        if(query) return query
        else throw TypeError('no user was found with given ID');
    } catch(err) {
        throw TypeError(err);
    }
}

const deleteAccount = async (userID) => {
    try{
        const query = await user.deleteOne({_id: userID});
        if(query != null) return {message: `delete user ${userID} successfully`}
        else throw TypeError('no user was found with given ID');
    } catch(err) {
        throw TypeError(err);
    }
}

module.exports = {
    register,
    login,
    resetPassword,
    findAccount,
    updateAccount,
    deleteAccount,
}