import React, {useEffect} from 'react';
import io from 'socket.io-client';
const socket = io('localhost:5000');
export default function Chat() {

    useEffect(() => {
        socket.on('connection', (data) => {
            console.log('blin')
        })
    }, [])

    return (
        <div>
            chat
        </div>
    )
}
