const account = require('../models/account');
const {createUser, deleteUser} = require('./user')

const createAccount = async (accountInfo, userInfo) => {
    const accountQuery = await account.create(accountInfo);

    const userQuery = await createUser(accountQuery._id, userInfo);

    return accountQuery;
}

const getAccountInfo = async(accountID) => {
    const accountInfo = await account.findOne({_id: accountID})
    if(!accountInfo) throw new Error ('no user was found')
    return accountInfo;
}

const login = async (accountIdentityVerification, password) => {
    const accountInfo = await account.findOne({
        $or:[
            {username: accountIdentityVerification}, 
            {mobile: accountIdentityVerification}, 
            {email: accountIdentityVerification}
        ]
    });

    //if find atleast 1 account                                   
    if(accountInfo != null){
        if(accountInfo.password == password) return accountInfo._id;
        throw new Error('wrong password');
    } else {
        throw new Error('wrong accountname');
    }
}

const findAccount = async(identityVerification) => {
    const accountInfo = await account.findOne({
        $or:[
            {"username": identityVerification},
            {"email": identityVerification},
            {"mobileNumber": identityVerification}
        ]
    }, 'accountInfo -_id')
    if(!accountInfo) throw new Error('no account was found')
    return accountInfo;
}

const updateAccount = async(id, newAccountInfo) => {
        const query = await account.updateOne(id, newAccountInfo);
        if(query) return query;
        throw TypeError('no account was found with given ID');
}

const deleteAccount = async (accountID) => {
    const query = await account.deleteOne({_id: accountID});
    await deleteUser(accountID);
    if(query != null) return {message: `delete account ${accountID} successfully`}
    throw TypeError('no account was found with given ID');
}

module.exports = {
    createAccount,
    getAccountInfo,
    login,
    findAccount,
    updateAccount,
    deleteAccount,
}