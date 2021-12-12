const {sendChat} = require('../controller/chat');
const {verifyToken} = require('../authorization/auth');

module.exports = (io) => {
    io
    .use(async(socket, next) => {
        if(socket.handshake.query && socket.handshake.query.token){
            try{
                const tokenInfo = await verifyToken(socket.handshake.query.token);
                socket.tokenInfo = tokenInfo;
                next();
            } catch(err) {
                next(err);
            }
        } else {
            next(new Error('no token'));
        }
    })
    .on('connection', (socket) => {
        console.log('user connect to socket');

        socket.on('join', (room) => {
            console.log(`user has join room ${room}`)
            socket.join(room)
        })

        socket.on('message', (payload) => {
            const {room, message} = payload;
            io.to(room).emit('message', {
                from: socket.tokenInfo.UID,
                message: message
            });
        })

        socket.on('disconnect', () => {
            console.log('user has disconnect');
        })
    })
}