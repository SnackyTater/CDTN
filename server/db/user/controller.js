const mongoose = require('mongoose');
const user = require('./user');

const createNewUser = async(userData) => {
    await user.create(userData).then((res) => {
        console.log(res);
    });
}

const getUserInfoByID = async (userID) => {
    try{
        let data = await user.findById(userID);
        if(data != null) {return data}
        else {throw new Error ('no data was found with given userID')}
    } catch (err) {
        throw(err.message)
    }
}

const updateUser = async (userData, userID) => {
    await user.findByIdAndUpdate(userID, userData).then((data) => {
        return data;
    }).catch((err) => {
        console.log(err);
    })
}

const deleteUser = async(userID) => {
    await user.findByIdAndDelete(userID).then((data) => {
        return data
    }).catch((err) => {
        console.log(err);
    })
}

const likeUser = async(userID, targetID) => {
    try {
        let status = await user.updateOne({_id: userID}, {$push:{ "matchMakingStatus.likes": targetID }});
        if(status != null){
            return {status: status, message: `like ${targetID} successfully`};
        } else {
            throw new Error("there's something wrong")
        }
    } catch(err) {
        throw (err.message)
    }
}

const checkLogin = async (account) => {
    try{
        let data = await user.findOne({'accountInfo.username': account.username, 'accountInfo.password': account.password});
        if(data != null){
            return data;
        } else {
            throw new Error('wrong username or password');
        }
    } catch (err) {
        throw(err.message);
    }
}

const nopeUser = async(userID, targetID) => {
    try {
        let status = await user.updateOne({_id: userID}, {$push:{ "matchMakingStatus.nopes": targetID }});
        if(status != null){
            return {status: status, message: `nope ${targetID} successfully`};
        } else {
            throw new Error("there's something wrong");
        }
    } catch(err) {
        throw (err.message)
    }
}


module.exports = {
    createNewUser,
    updateUser,
    deleteUser,
    getUserInfoByID,
    likeUser,
    nopeUser,
    checkLogin,
}