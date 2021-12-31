import io from 'socket.io-client';

const socket = (token) => {
    const host = (process.env.NODE_ENV==='production') ? 'https://cosmitto.herokuapp.com' : 'http://localhost:5000';
    return io(host, {
        query: {
            token: token
        }
    })
}

export default socket;
