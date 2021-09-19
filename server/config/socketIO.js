module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on("sendMessage", (message, room) => {
            io.room(room).emit(message);
        })
    });
}