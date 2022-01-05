const account = require('../models/account');
const {createUser, deleteUser, getUser} = require('./user');

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
    return await account.findOne({
        $or:[
            {username: accountIdentityVerification}, 
            {mobile: accountIdentityVerification}, 
            {email: accountIdentityVerification}
        ]
    });
}

const updateAccount = async(id, updateInfo) => {
    const query = await account.updateOne({"_id": id}, updateInfo);
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
    console.log(accountInfo)
    //if find atleast 1 account                                   
    if(accountInfo != null){
        const {password: accountPassword, _id: accountID} = accountInfo;

        const {_id: userID} = await getUser(accountID, {"_id": 1});

        if(accountPassword == password) return {accountID, userID};
        throw new Error('wrong password');
    } else {
        throw new Error('wrong accountname');
    }
}

module.exports = {
    createAccount,
    getAccountInfo,
    getAccount,
    updateAccount,
    deleteAccount,
    login,
}