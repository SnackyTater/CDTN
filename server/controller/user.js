const user = require('../models/user');

const getUserInfo = async (id) => {
    const userInfo = await 
        user.findOne({
            $or: [
                {"_id": id},
                {"account": id}
            ]
        },{"info": 1, "_id": 0})
        .populate("info.passions")
        .lean();

    if(!userInfo) throw new Error ('no user was found with given id');

    return userInfo;
}

const getUser = async(id) => {
    const userInfo = await
        user.findOne({
            $or: [
                {"_id": id},
                {"account": id}
            ]
        },{"_id": 0, "matchMaking.status": 0})
        .lean();
    
    if(!userInfo) throw new Error ('no user was found with given id');

    return userInfo;
}

const getNotification = async(id) => {
    const userNotification = await
        user.findOne({
            $or: [
                {"_id": id},
                {"account": id}
            ]
        },{"_id": 0, "notification": 1})
        .lean();
    
    return userNotification;
}

const addNotification = async(id, notification) => {
    const userNotification = await 
        user.updateOne({
            $or: [
                {"_id": id},
                {"account": id}
            ]
        },{
            $push: {"notification": {content: notification}
        }})
        .lean();
    
    return userNotification;
}

const deleteNotification = async(id, notificationID) => {
    console.log(notificationID);
    const userNotification = await user.updateOne({
        $or: [
            {"_id": id},
            {"account": id}
        ]
    },{
        $pull: {"notification": {"_id": notificationID}}
    })
    .lean();

    return userNotification
}

const createUser = async (accountID, userInfo) => {
    const userData = {
        account: accountID,
        info: userInfo
    }

    console.log(userData)
    const userQuery = await user.create(userData);

    return userQuery;
}

const updateUser = async(id, userInfo) => {
    console.log(id, userInfo)
    const userQuery = await
        user.updateOne({
            $or: [
                {"_id": id},
                {"account": id}
            ]
        }, {
            info: userInfo,
        }, {new: true})
        .lean();
    
    return userQuery;
}

const deleteUser = async(id) => {
    const userQuery = await 
        user.deleteOne({
            $or: [
                {"_id": id},
                {"account": id}
            ]
        }, (err) => {
            throw new Error(err.message);
        })
    
    return userQuery
}

module.exports = {
    getUser,
    getNotification,
    addNotification,
    deleteNotification,
    createUser,
    getUserInfo,
    updateUser,
    deleteUser,
}