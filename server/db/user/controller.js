const mongoose = require('mongoose');
const user = require('./user');

const createNewUser = async(userData) => {
    await user.create(userData).then((res) => {
        console.log(res);
    });
}

const getUserInfoByID = async (userID) => {
    await user.findById(userID).then((data) => {
        if(data === null)
            return 'ERROR! no data was found with userID'
        return data;
    }).catch((err) => {
        console.log(err);
    })
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
    await user.updateOne({_id: userID}, {$push:{ "matchMakingStatus.likes": targetID }}).then((data) => {
        console.log(data);
    }).catch((err) => { console.log(err) });
}

module.exports = {
    createNewUser,
    updateUser,
    deleteUser,
    getUserInfoByID,
    likeUser,
}