const chatLog = require('../model/chatlog');

const getChatList = async (userID) => {
    try{
        const list = await chatLog.find({participant: {$in: [userID]}});
        return list;
    } catch(err){
        throw new Error(err);
    }  
}

const getChatByRoomID = async (roomID) => {
    try{
        const chatRoom = await chatLog.findOne({_id: roomID})
        if(chatRoom.length != 0) return chatRoom;
        else throw new Error('cant find any chat room with given ID');
    }catch(err){
        throw new Error(err);
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

const sendChat = async(roomID, senderID, message) => {
    try{
        const chatRoom = await chatLog.updateOne({_id: roomID}, {$push: {log: {from: senderID, message}}}, {new: true, fields:{log: 1}});
        return chatRoom;
    }catch(err){
        throw new Error(err);
    }
}

const changeChatRoomName = async (chatRoomID, newName) => {
    try{
        const chatRoom = await chatLog.updateOne({_id: chatRoomID}, {name: newName}, {new:true, fields:{name: 1}});
        return chatRoom;
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {
    getChatList,
    getChatByRoomID,
    sendChat,
    createChatRoom,
    changeChatRoomName
}