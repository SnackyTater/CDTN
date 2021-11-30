const user = require('../models/user');
const { dobCalculator } = require('../scripts/utils');

const addUserMatchMakingStatus = async(userID, targetID, type) => {
    return await user.updateOne({
        $or: [
            {"_id": userID},
            {"account": userID}
        ]
    }, {
        $push: {
            "matchMaking.status": {
                "id": targetID,
                "type": type
            }
        }
    })
}

const removeUserMatchMakingStatus = async(userID, targetID, type) => {
    return await user.updateOne({
        $or: [
            {"_id": userID},
            {"account": userID}
        ]

    }, {
        $pull: {
            "matchMaking.status": {
                "id": targetID,
                "type": type
            }
        }
    })
}

const updateUserMatchMakingStatus = async(userID, targetID, type) => {
    return await user.updateOne({
        $or: [
            {"_id": userID},
            {"account": userID},
        ],
        "matchMaking.status.id": targetID
    },{
        $set: {
            "matchMaking.status.$.type": type
        }
    })
}

const toggleLikeUser = async(userID, targetID) => {
    //userID in receive parameter is actually user's account id
    const { matchMaking: {status: userLikes}, _id } = await user.findOne({
        $or: [
            {"account": userID}, 
            {"_id": userID}
        ]
    });
    
    const { matchMaking: {status: targetLikes}, info: {fullName: targetFullName}, info: targetInfo} = await user.findOne({
        $or: [
            {"account": targetID}, 
            {"_id": targetID}
        ]
    });
    
    if(userLikes && targetLikes){
        userID = _id.toString();

        const targetIndex = userLikes.findIndex((user) => user.id == targetID && user.type == 'like');
        const userIndex = targetLikes.findIndex((user) => user.id == userID && user.type == 'like');

        //match with target
        if(userIndex != -1){
            const targetStatus = await updateUserMatchMakingStatus(targetID, userID, 'match');
            const userStatus = await addUserMatchMakingStatus(userID, targetID, 'match');

            if(userStatus.modifiedCount && targetStatus.modifiedCount){
                return {
                    status: {userStatus, targetStatus},
                    info: targetInfo,
                    message: `match with ${targetFullName}`
                }
            }  
        }
        //like target
        if(targetIndex == -1){
            const status = await addUserMatchMakingStatus(userID, targetID, 'like');
            console.log('b')
            if(status.modifiedCount && status.matchedCount)
                return {
                    status: status,
                    info: {},
                    message: `like ${targetFullName} sucessfully`
                }
        }
        //unlike target
        if(targetIndex != -1){
            const status = await removeUserMatchMakingStatus(userID, targetID, 'like');
            
            if(status.modifiedCount && status.matchedCount)
                return {
                    status: status,
                    info: {},
                    message: `unlike ${targetFullName} sucessfully`
                }
        }

        return new Error('something gone wrong');
    }
    return new Error('no user was found with given ID')
}

//same shit like toggle like (u too block)
const toggleNopeUser = async(userID, targetID) => {
    const { matchMaking: {status: userNopes} } = await user.findOne({
        $or: [
            {"account": userID}, 
            {"_id": userID}
        ]
    });

    if(userNopes){
        const targetIndex = userNopes.findIndex((user) => user.id == targetID && user.type == 'nope');

        //nope target
        if(targetIndex == -1){
            const status = await addUserMatchMakingStatus(userID, targetID, 'nope');
            if(status.modifiedCount && status.matchedCount){
                return {message: `nope user sucessfully`}
            } 
        }
        //un-nope target
        if(targetIndex != -1){
            const status = await removeUserMatchMakingStatus(userID, targetID, 'nope');
            
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


        //query
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
                "matchMaking.config.location": {
                    $nearSphere: {
                        $geometry: {
                           type : "Point",
                           coordinates : [longtitude, latitude]
                        },
                        $maxDistance: maxDistance
                     }
                }
            },{'info': 1})
            .limit(50);
        console.log(recs)
        return recs;
    } catch(err) {
        console.log(err.message)
        throw(err.message);
    }
}


module.exports = {
    toggleLikeUser,
    toggleNopeUser,
    recommend,
}