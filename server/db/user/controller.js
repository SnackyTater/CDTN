const mongoose = require('mongoose');
const user = require('./user');
const {dobCalculator} = require('../../utils/utils')

const createNewUserAccount = async(userData) => {
    try{
        let query = await user.create({accountInfo: userData.accountInfo, userInfo: userData.userInfo, matchMakingConfig: userData.matchMakingConfig});
        return query;
    } catch(err) {
        if(err.code == 11000){
            if(err.keyValue.hasOwnProperty('accountInfo.username')){
                throw `${err.keyValue['accountInfo.username']} has been used`;
            }
            if(err.keyValue.hasOwnProperty('accountInfo.email')){
                throw `${err.keyValue['accountInfo.email']} has been used`;
            }
        } else {
            throw err.message;
        }
    }
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

const updateUserInfo = async (userID, userData) => {
    try{
        let query = await user.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(userID)}, {$set: userData}, {new: true});
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

const deleteUser = async(userID) => {
    await user.findByIdAndDelete(userID).then((data) => {
        return data
    }).catch((err) => {
        console.log(err);
    })
}

const checkLogin = async (account) => {
    try{
        let query = await user.findOne({'accountInfo.username': account.username});
        if(query != null){
            let data = query.toJSON();
            if(data.accountInfo.password == account.password){
                return data;
            } else {
                throw new Error('wrong password');
            }
        } else {
            throw new Error('wrong username');
        }
    } catch (err) {
        throw(err.message);
    }
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

const blockUser = async(userID, targetID) => {
    try {
        let status = await user.updateOne({_id: userID}, {$push:{ "userInfo.block": targetID }});
        if(status != null){
            return {status: status, message: `block ${targetID} successfully`};
        } else {
            throw new Error("there's something wrong");
        }
    } catch(err) {
        throw (err.message)
    }
}

const recommend = async(userID) => {
    try{
        //get user match making info
        let query = await getUserInfoByID(userID);
        let userInfo = query.toJSON();

        //setup match-making config for searching based on user preferrence
        let gender = (userInfo.matchMakingConfig.gender == 'both') ? (
            [{"userInfo.gender": 'female'}, {"userInfo.gender": 'male'}]
        ) : (
            [{"userInfo.gender": userInfo.matchMakingConfig.gender}]
        )
        
        //all user which are liked, noped, matched, blocked, self
        let nin = [...userInfo.userInfo.block, ...userInfo.matchMakingStatus.likes, ...userInfo.matchMakingStatus.nopes, ...userInfo.matchMakingStatus.matches];
        nin.push(userInfo._id)
        
        let ageFrom = dobCalculator(userInfo.matchMakingConfig.age.from);
        let ageTo = dobCalculator(userInfo.matchMakingConfig.age.to);
        
        let longtitude = userInfo.matchMakingConfig.location.coordinates[0];
        let latitude = userInfo.matchMakingConfig.location.coordinates[1];
        let maxDistance = userInfo.matchMakingConfig.zoneLimit.diameter;

        //query
        let recs = await user.find({
                $or: gender,                                            //find user based on gender male || female || both
                "_id": {$nin: nin},                                     //find user except for user which contained in this list
                "userInfo.DateOfBirth": {$lte: ageFrom, $gte: ageTo},   //find user born between age from & age to
                "matchMakingConfig.location": {                         //find user within diameter of coordinates
                    $nearSphere: {
                        $geometry: {
                           type : "Point",
                           coordinates : [longtitude, latitude]
                        },
                        $maxDistance: maxDistance
                     }
                }
        });
        return recs;
    } catch(err) {
        console.log(err.message)
        throw(err.message);
    }
}


module.exports = {
    createNewUserAccount,
    updateUserInfo,
    deleteUser,
    getUserInfoByID,
    likeUser,
    nopeUser,
    checkLogin,
    blockUser,
    recommend,
}