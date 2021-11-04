const user = require('../model/user');

const getUserBioByID = async (userID) => {
    try{
        let data = await user.findOne({_id: userID}, {userInfo: 1, matchMakingConfig: 1}).populate("userInfo.passions", "name");
        if(data != null) {return data}
        else {throw new Error ('no data was found with given userID')}
    } catch (err) {
        // console.log(err)
        throw(err.message)
    }
}

const getUserInfo = async(userID, config) => {
    try{
        const userInfo = await user.findOne({_id: userID}, config);
        if(userInfo != null) return userInfo;
    } catch(err) {
        throw err.message;
    }
}

const updateUserBio = async (userID, userData) => {
    try{
        let query = await user.findByIdAndUpdate({_id: userID}, {$set: {userInfo: userData}}, {new: true, select: {"userInfo": 1}});
        if(query != null){
            return query;
        } else {
            throw new Error('no user was found with given ID');
        }
    } catch(err) {
        console.log(err);
        throw(err.message)
    }
}

const addUserImage = async(userID, imageURL) => {
    try{
        let query = await user.findByIdAndUpdate({_id: userID}, {$push:{ "userInfo.profileImage": imageURL }}, {new: true, select: {"userInfo": 1}});
        if(query != null){
            return query;
        } else {
            throw new Error('no user was found with given ID');
        }
    } catch(err) {
        throw(err.message)
    }
}

module.exports = {
    updateUserBio,
    getUserBioByID,
    getUserInfo,
    addUserImage,
}