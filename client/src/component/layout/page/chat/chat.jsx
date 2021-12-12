import React, {useEffect, useState, useRef} from 'react';
import io from 'socket.io-client';

export default function Chat() {
    const [data, setData] = useState([])

    const host = 'localhost:5000';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBSUQiOiI2MWEyZGQzMjM3NmJhNjJlNGZhNzE1NmIiLCJVSUQiOiI2MWEyZGQzMjM3NmJhNjJlNGZhNzE1NmQiLCJpYXQiOjE2Mzg1MTE3OTAxODAsImV4cCI6MTYzODU5ODE5MDE4MH0.pRjspRtA18EFsODebFw9PJIIlW8EFCQQin__BYBURA0'

    const socket = useRef();

    useEffect(async() => {
        //componentDidMount
        socket.current = await io.connect(host, {
            query: `token=${token}`
        })

        await socket.current.emit('join', 'a');

        await socket.current.on('message', (message) => {
            console.log(message)
        })

        // return () => {
        //     socket.current.emit('something');
        // }

    }, [])

    const sendMessage = (e) => {
        socket.current.emit('message', {room: 'a', message: 'sasdasd'});
    }

    return (
        <div>
            <div>
                aaaa
            </div>
            <div>
                {data.map((message) => <div>{message}</div>)}
            </div>
            
            <button onClick={() => {
                sendMessage();
            }}>press me</button>
        </div>
    )
}
