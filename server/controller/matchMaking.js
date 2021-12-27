const user = require('../models/user');
const {createChatRoom, getChatRoom} = require('./chat');
const { dobCalculator } = require('../scripts/utils');

const matchUser = async(userID, targetID) => {
    const userStatus = await user.updateOne({
        "_id": userID
    }, {
        $push: {
            "matchMaking.status": {
                "id": targetID,
                "type": 'match'
            }
        }
    })
    const targetStatus = await user.updateOne({
        "_id": targetID
    }, {
        $set: {
            "matchMaking.status": {
                "id": userID,
                "type": 'match'
            }
        }
    })

    const chatRoom = await createChatRoom(userID, targetID)

    return {userStatus, targetStatus, chatRoom}
}

const unmatchUser = async(userID, targetID) => {
    const userStatus = await user.updateOne({
        "_id": userID
    }, {
        $pull: {
            "matchMaking.status": {
                "id": targetID,
                "type": 'match'
            }
        }
    })
    const targetStatus = await user.updateOne({
        "_id": targetID
    }, {
        $set: {
            "matchMaking.status": {
                "id": userID,
                "type": 'like'
            }
        }
    })

    const chatRoom = await deleteChatRoom(userID, targetID)
}

const likeUser = async(userID, targetID) => {
    return await user.updateOne({
        "_id": userID
    }, {
        $push: {
            "matchMaking.status": {
                "id": targetID,
                "type": 'like'
            }
        }
    })
}

const unlikeUser = async(userID, targetID) => {
    return await user.updateOne({
        "_id": userID
    }, {
        $pull: {
            "matchMaking.status": {
                "id": targetID,
                "type": 'like'
            }
        }
    })
}

const toggleLikeUser = async(userID, targetID) => {
    console.log(userID, targetID);
    //userID in receive parameter is actually user's account id
    const userInfo = await user.findOne({"_id": userID});
    
    const targetInfo = await user.findOne({"_id": targetID});
    
    if(userInfo && targetInfo){
        const userMatchMakingStatus = userInfo.matchMaking.status;
        const targetMatchMakingStatus = targetInfo.matchMaking.status;

        const targetIndex = userMatchMakingStatus.findIndex((user) => user.id == targetID && user.type == 'like');
        const userIndex = targetMatchMakingStatus.findIndex((user) => user.id == userID && user.type == 'like');
        const userIsMatch = userMatchMakingStatus.findIndex((user) => user.id == targetID && user.type == 'match');

        //match with target
        if(userIsMatch != -1){
            return {
                status: {},
                info: {},
                message: `already match with ${targetInfo.info.fullName}`
            }
        }
        if(userIndex != -1){
            const {userStatus, targetStatus, chatRoom} = await matchUser(userID, targetID)

            if(userStatus.modifiedCount && targetStatus.modifiedCount){
                return {
                    status: {userStatus, targetStatus},
                    info: {
                        user: targetInfo,
                        chat: chatRoom
                    },
                    message: `match with ${targetInfo.info.fullName}`
                }
            }  
        }
        //like target
        if(targetIndex == -1){
            const status = await likeUser(userID, targetID);

            if(status.modifiedCount && status.matchedCount)
                return {
                    status: status,
                    info: {},
                    message: `like ${targetInfo.info.fullName} sucessfully`
                }
        }
        //unlike target
        if(targetIndex != -1){
            const status = await unlikeUser(userID, targetID);
            
            if(status.modifiedCount && status.matchedCount)
                return {
                    status: status,
                    info: {},
                    message: `unlike ${targetInfo.info.fullName} sucessfully`
                }
        }

        return new Error('something gone wrong');
    }
    return new Error('no user was found with given ID')
}

const nopeUser = async(userID, targetID) => {
    console.log('in nope')
    return await user.updateOne({
        "_id": userID
    }, {
        $push: {
            "matchMaking.status": {
                "id": targetID,
                "type": 'nope'
            }
        }
    })
}

const unnopeUser = async(userID, targetID) => {
    return await user.updateOne({
        "_id": userID
    }, {
        $pull: {
            "matchMaking.status": {
                "id": targetID,
                "type": 'nope'
            }
        }
    })
}
const toggleNopeUser = async(userID, targetID) => {
    const { matchMaking: {status: userNopes}, info } = await user.findOne({
        $or: [
            {"account": userID}, 
            {"_id": userID}
        ]
    });
    console.log(targetID)
    if(userNopes){
        const targetIndex = userNopes.findIndex((user) => user.id == targetID && user.type == 'nope');
        console.log('im in')
        //nope target
        if(targetIndex == -1){
            const status = await nopeUser(userID, targetID);
            console.log('noppe')
            if(status.modifiedCount && status.matchedCount){
                return {message: `nope user sucessfully`}
            } 
        }
        //un-nope target
        if(targetIndex != -1){
            const status = await unnopeUser(userID, targetID);
            console.log('unnope')
            if(status.modifiedCount && status.matchedCount){
                return {message: `un-nope user sucessfully`}
            }
        }

        return new Error('something gone wrong');
    }
    return new Error('no user was found with given ID')
}

const recommend = async(userID) => {
    try{
        //get user match making info
        let {matchMaking, _id} = await 
            user.findOne({
                $or: [
                    {"_id": userID},
                    {"account": userID}
                ]
            },{
                "matchMaking": 1, 
                "_id": 1,
            })
            .lean();

        const exclude = matchMaking.status.map((item) => {
            return item.id.toString();
        });

        const gender = (matchMaking.config.gender === 'both') ? ([
            {"info.gender": 'female'}, 
            {"info.gender": 'male'}, 
            {"info.gender": 'unknown'}
        ]) : ([
            {"info.gender": matchMaking.config.gender}
        ]);

        const DOBFrom = dobCalculator(matchMaking.config.age.from);
        const DOBTo = dobCalculator(matchMaking.config.age.to);

        const longtitude = matchMaking.config.location.coordinates[0];
        const latitude = matchMaking.config.location.coordinates[1];
        const maxDistance = matchMaking.config.zoneLimit.diameter;

        //wil priority these people to appear first in array
        const priority = await
            user.find({
                "matchMaking.status": {
                    "id": _id,
                    "type": 'like'
                }
            })
            .populate({
                path: 'info.passions'
            })
            .lean();

        //find additional people 
        let recs = await 
            user.find({
                $or: gender,
                "_id": {
                    $nin: exclude,
                    $ne: _id,
                },
                "info.DateOfBirth": {
                    $lte: DOBFrom,
                    $gte: DOBTo
                },
                "info.relationship.status": "single",
                // "matchMaking.config.location": {
                //     $nearSphere: {
                //         $geometry: {
                //            type : "Point",
                //            coordinates : [longtitude, latitude]
                //         },
                //         $maxDistance: maxDistance
                //      }
                // }
            })
            .populate({
                path: 'info.passions'
            })
            .limit(20-priority.length);

        return [...priority, ...recs];
    } catch(err) {
        throw(err.message);
    }
}

const getMatches = async(userID) => {

    const userData = await user.findOne({
        "_id": userID,
        "matchMaking.status.type": 'match'
    },{
        "matchMaking.status": 1,
        "_id": 0
    })
    .populate({
        path: 'matchMaking.status',
        populate: {
            path: 'id',
            select: '_id info matchMaking'
        }
    })
    .lean();

    const matchList = (!userData) 
        ? [] 
        : userData.matchMaking.status
        .filter((user) => user.id != null)
        .map((user) => user.id);

    const matchListWithChat = Promise.all(matchList.map(async(user) => {
        const chatRoom = await getChatRoom(userID, user._id);
        return {...user._doc, chat: chatRoom}
    })) 
    console.log('s')
    return matchListWithChat;
    
}

module.exports = {
    toggleLikeUser,
    toggleNopeUser,
    recommend,
    getMatches,
}