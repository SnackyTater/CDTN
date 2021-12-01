const user = require('../models/user');

const getUser = async(id, config) => {
    const userInfo = await
        user.findOne({
            $or: [
                {"_id": id},
                {"account": id}
            ]
        }, (config) ? config : {
            "info": 1,
            "_id": 0,
            "matchMaking.config": 1,
        })
        .lean();

    console.log(userInfo)
    
    if(!userInfo) throw new Error ('no user was found with given id');

    return userInfo;
}

const createUser = async (accountID, userInfo) => {
    const userData = {
        account: accountID,
        info: userInfo
    }

    const userQuery = await user.create(userData);

    return userQuery;
}

const updateUser = async(id, userInfo) => {
    const {info, matchMaking: {config}} = userInfo;

    const userQuery = await
        user.updateOne({
            $or: [
                {"_id": id},
                {"account": id}
            ]
        }, {
            "info": info,
            "matchMaking.config": config
        }, {new: true})
    
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
            return new Error(err.message);
        })
    
    return userQuery
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
            $push: {"notification": {"content": notification}}
        })
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



module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,

    getNotification,
    addNotification,
    deleteNotification,
}