const chatLog = require('../models/chatlog');

const getChatList = async (userID) => {
    try{
        const list = await chatLog.find({
            "participant": {
                $in: [userID]
            }
        }).populate({
            "path": 'participant',
        }).lean();
        return list;
    } catch(err){
        throw new Error(err);
    }  
}

const getChatByRoomID = async (roomID) => {
    try{
        const chatRoom = await chatLog.findOne({
            "_id": roomID
        })
        .populate({
            "path": 'participant'
        })
        .lean();
        
        return chatRoom;

    }catch(err){
        throw new Error(err.message);
    }
}

const createChatRoom = async(userID1, userID2) => {
    try{
        const chatRoom = await chatLog.create({participant: [userID1, userID2]});
        return chatRoom;
    }catch(err){
        throw new Error(err);
    }
}

const deleteChatRoom = async(userID1, userID2) => {
    return await chatLog.deleteOne({
        "participant": {
            $in: [userID1, userID2]
        }
    })
}

const sendChat = async(roomID, senderID, message) => {
        return await chatLog.updateOne({
            "_id": roomID
        }, {
            $push: {
                "log": {
                    "from": senderID, 
                    message
                }
            }
        }, {
            new: true, 
            fields: {
                log: 1
            }
        });
}


module.exports = {
    getChatList,
    getChatByRoomID,
    sendChat,
    createChatRoom,
}