const account = require('../models/account');
const {createUser, deleteUser, getUser} = require('./user');
const {getRequest, deleteRequest} = require('./resetRequest');

const createAccount = async (accountInfo, userInfo) => {
    const {_id: accountID} = await account.create(accountInfo);

    const {_id: userID} = await createUser(accountID, userInfo);

    return {accountID, userID};
}

const getAccountInfo = async(accountID) => {
    const accountInfo = await account.findOne({"_id": accountID}, {"_id": 0})
    if(!accountInfo) throw new Error ('no user was found')
    return accountInfo;
}

const getAccount = async(accountIdentityVerification) => {
    const accountInfo = await account.findOne({
        $or:[
            {username: accountIdentityVerification}, 
            {mobile: accountIdentityVerification}, 
            {email: accountIdentityVerification}
        ]
    });

    return accountInfo;
}

const updateAccount = async(id, accountInfo) => {
        const query = await account.updateOne({"_id": id}, accountInfo);
        if(query) return query;
        throw TypeError('no account was found with given ID');
}

const deleteAccount = async (accountID) => {
    const query = await account.deleteOne({_id: accountID});
    await deleteUser(accountID);
    if(query != null) return {message: `delete account ${accountID} successfully`}
    throw TypeError('no account was found with given ID');
}

const login = async (accountIdentityVerification, password) => {
    const accountInfo = await account.findOne({
        $or:[
            {username: accountIdentityVerification}, 
            {mobile: accountIdentityVerification}, 
            {email: accountIdentityVerification}
        ]
    });

    const {password: accountPassword, _id: accountID} = accountInfo;

    const {_id: userID} = await getUser(accountID, {"_id": 1});

    //if find atleast 1 account                                   
    if(accountInfo != null){
        if(accountPassword == password) return {accountID, userID};
        return new Error('wrong password');
    } else {
        return new Error('wrong accountname');
    }
}

const resetPassword = async(requestID, password) => {
    const requestInfo = await getRequest(requestID);
    
    if(!requestInfo)
        return new Error('no request was found with given ID');
    // console.log('pass 0.5')
    // console.log(Date.now())
    // console.log(Date.parse(requestInfo.expire) > Date.now())
    // if(Date.parse(requestInfo.expire) > Date.now())
    //     return new Error('request was expire');

    await deleteRequest(requestID);

    const result = await account.updateOne({
        "_id": requestInfo.id
    },{
        "password": password
    })

    return result;
}

module.exports = {
    createAccount,
    getAccountInfo,
    getAccount,
    updateAccount,
    deleteAccount,
    login,
    resetPassword,
}