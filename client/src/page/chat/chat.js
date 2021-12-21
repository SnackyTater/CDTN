import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';

export default function Chat() {
    const rooms = ['a', 'b', 'c']
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');


    const socket = io('http://localhost:5000', {
        query: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBSUQiOiI2MWEyZGQzMjM3NmJhNjJlNGZhNzE1NmIiLCJVSUQiOiI2MWEyZGQzMjM3NmJhNjJlNGZhNzE1NmQiLCJpYXQiOjE2Mzk5OTc4NTQzMDAsImV4cCI6MTY0MDA4NDI1NDMwMH0.UVfvR0suxlMQn5bT91YNAQqZwebK9WLxGFpBxjg4uV0'
        }
    });

    useEffect(() => {
        socket.emit('join', room);

        socket.on('message', message => {
            console.log(message);
        })

        return () => {
            socket.disconnect();
        }
    }, [room])

    return (
        <div>
            {
                rooms.map((room, index) => 
                    <button key={index} onClick={() => {setRoom(room)}} style={{padding: '30px'}}>{room}</button>
                )
            }
            <div style={{fontSize: '50px'}}>
                {room}
            </div>
            <div>
                <input onChange={(e) => {setMessage(e.target.value)}}/>
                <button onClick={() => {socket.emit('message', {room, message})}}>submit</button>
            </div>
        </div>
    )
}
