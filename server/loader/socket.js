const {sendChat} = require('../controller/chat');
const {verifyToken} = require('../authorization/auth');

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on("sendMessage", async(payload) => {
            const {token, room, message} = payload;
            // io.room(room).emit(message);
            // const messageStatus = await sendChat();
            // if(messageStatus.modifiedCount)
            //     io.room(room).emit(Error("message can't be sent"));
            // else
            //     io.room(room).emit(message)
        })
        console.log('connect to socket');
    });
}