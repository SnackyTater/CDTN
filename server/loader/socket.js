module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on("sendMessage", (payload) => {
            const {room, message} = payload;
            // io.room(room).emit(message);
            console.log(room);
            console.log(message);
        })
        console.log('connect to socket');
    });
}