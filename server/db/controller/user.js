const user = require('../model/user');

const getUserBioByID = async (userID) => {
    try{
        console.log(userID)
        let data = await user.findById(userID).populate("userInfo.passions", "name");
        if(data != null) {return data}
        else {throw new Error ('no data was found with given userID')}
    } catch (err) {
        // console.log(err)
        throw(err.message)
    }
}

const updateUserBio = async (userID, userData) => {
    try{
        let query = await user.findByIdAndUpdate({_id: userID}, {$set: userData}, {new: true});
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
        let query = await user.findByIdAndUpdate({_id: userID}, {$push:{ "userInfo.profileImage": imageURL }}, {new: true});
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
    addUserImage,
}