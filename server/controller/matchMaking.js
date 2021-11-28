const mongoose = require('mongoose');
const user = require('../model/user');
const { dobCalculator } = require('../../utils/utils')
const { createChatRoom } = require('../controller/chatLog');

const toggleLikeUser = async(userID, targetID) => {
    try {
        const userInfo = await user.findOne({"account": userID});
        const targetInfo = await user.findOne({"_id": targetID});

        if(userInfo && targetInfo){
            let message = '';

            let userLikes = [];
            let targetLikes = [];

            let userIndex = -1;
            let targetIndex = -1;

            [userInfo.matchMaking.status].forEach((user, index) => {
                if(user.id == targetID) targetIndex = index; 
                if(user.type === 'like') userLikes.push(user.id.toString());
            })

            [targetInfo.matchMaking.status].forEach((user, index) => {
                if(user.id == targetID) userIndex = index; 
                if(user.type === 'like') targetLikes.push(user.id.toString());
            })
            // //get list of user who user, target like
            // const userLikes = userMatchMakingSatus.filter((user) => user.type === 'like').map((user) => user.id.toString());
            // const targetLikes = targetMatchMakingSatus.filter((user) => user.type === 'like').map((user) => user.id.toString());

            // //contain targetID index (-1 mean not exist, else)
            // let targetIndex = userLikes.indexOf(targetID)  //check if targetID is in user's like list
            // let userIndex = targetLikes.indexOf(userID)    //check if userID is in target's like list

            // target like user but user haven't like target
            if(userIndex != -1){
                targetMatchMakingSatus.splice(userIndex, 1);
                userMatchMakingSatus.push({id: mongoose.Types.ObjectId(targetID), type: 'match'});
                targetMatchMakingSatus.push({id: mongoose.Types.ObjectId(userID), type: 'match'});

                //create chat room for match people
                createChatRoom(userID, targetID);

                message = `match with ${targetName}`;
            }
            //user have liked target
            if(targetIndex != -1 && userIndex == -1){
                userMatchMakingSatus.splice(targetIndex, 1);
                message = `unlike ${targetName} successfully`;
            }
            //user haven't liked target
            if(targetIndex === -1 && userIndex == -1){
                userMatchMakingSatus.push({id: mongoose.Types.ObjectId(targetID), type: 'like'});
                message = `like ${targetName} successfully`;
            }

            await user.updateOne({_id: userID}, {matchMakingStatus: userMatchMakingSatus});
            await user.updateOne({_id: targetID}, {matchMakingStatus: targetMatchMakingSatus});

            return message;

        } else {
            throw new Error("no user was found with given ID")
        }
    } catch(err) {
        throw (err.message)
    }
}

//same shit like toggle like (u too block)
const toggleNopeUser = async(userID, targetID) => {
    try {
        let userInfo = await user.findOne({_id: userID})
        
        if(userInfo != null){
            //contain id of which has been liked by the user 
            let userNopes = userInfo.matchMakingStatus.likes 

            //contain targetID index (-1 mean not exist, else)
            let targetIndex = userNopes.indexOf(mongoose.Types.ObjectId(targetID))

            if(targetIndex != -1){
                let query = await user.updateOne({_id: userID}, {$pop: {"matchMakingStatus.nopes": targetIndex-1}})
                return {status: query, message: `un-nope ${targetID} successfully`};
            } else {
                let query = await user.updateOne({_id: userID}, {$push:{ "matchMakingStatus.nopes": targetID }});
                return {status: query, message: `nope ${targetID} successfully`};
            }
        } else {
            throw new Error("no user was found with given ID")
        }
    } catch(err) {
        throw (err.message)
    }
}

const toggleBlockUser = async(userID, targetID) => {
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
        let query = await user.findOne({_id: userID},{"matchMaking.config": 1, "matchMaking.status": 1}).lean();
        let userInfo = query.toJSON();

        //setup match-making config for searching based on user preferrence
        let gender = (userInfo.matchMakingConfig.gender == 'both') ? (
            [{"info.gender": 'female'}, {"info.gender": 'male'}]
        ) : (
            [{"info.gender": userInfo.matchMakingConfig.gender}]
        )
        
        //all user which are liked, noped, matched, blocked, self
        let nin = userInfo.matchMakingStatus.map((user) => user.id);
        nin.push(userInfo._id)
        
        let ageFrom = dobCalculator(userInfo.matchMakingConfig.age.from);
        let ageTo = dobCalculator(userInfo.matchMakingConfig.age.to);
        
        let longtitude = userInfo.matchMakingConfig.location.coordinates[0];
        let latitude = userInfo.matchMakingConfig.location.coordinates[1];
        let maxDistance = userInfo.matchMakingConfig.zoneLimit.diameter;

        //query
        let recs = await user.find({
                //"accountInfo.status": true,                           //find user which their account has been verified
                $or: gender,                                            //find user based on gender male || female || both
                "_id": {$nin: nin},                                     //find user except for user which contained in this list
                "userInfo.DateOfBirth": {$lte: ageFrom, $gte: ageTo},   //find user born between age from & age to
                "userInfo.relationship.status": "single",
                // "matchMakingConfig.location": {                         //find user within diameter of coordinates
                //     $nearSphere: {
                //         $geometry: {
                //            type : "Point",
                //            coordinates : [longtitude, latitude]
                //         },
                //         $maxDistance: maxDistance
                //      }
                // }
        },{'userInfo': 1});

        return recs;
    } catch(err) {
        console.log(err.message)
        throw(err.message);
    }
}


module.exports = {
    toggleLikeUser,
    toggleNopeUser,
    toggleBlockUser,
    recommend,
}