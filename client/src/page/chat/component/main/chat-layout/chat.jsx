import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import io from '../../../../../socket/socket';
import {getChatContent} from '../../../../../api/common/chat';

import './chat.scss'

export default function ChatInterface({room, userID}) {
    // room = '61c830441b0597f78c555fdb';
    const [chatLog, setChatlog] = useState([]);
    const [message, setMessage] = useState('');
    const [cookies, setCookie] = useCookies('jwt');

    const socket = io(cookies.jwt);

    useEffect(() => {
        
        getChatContent({token: cookies.jwt, chatID: room}).then((chat) => {
            setChatlog(chat.log);

            socket.on('connect', () => {
                console.log('connected successfully')
            })
    
            socket.emit('join', room);
    
            socket.on('message', message => {
                console.log(message);
                setChatlog(prev => setChatlog([...prev, message]));
            })
        }).catch((error) => {
            console.log(error);
        })

        return () => {
            socket.disconnect();
        }
    }, [room])

    

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('message', {room, message});
        setMessage('');
    }

    const handleMessage = e => {
        setMessage(e.target.value);
    }

    return (
        <>
            <div className='box__chat-display'>
                    {
                        chatLog?.map((chat, index) => {
                            const detect = (chat.from === userID) ? 'me' : 'other'
                            return <div key={index} className={`message--${detect}`}>{chat.message}</div>
                        })
                    }
            </div>
            <div className='box__chat-input'>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleMessage} value={message}/>
                    <input type="submit" style={{display: 'none'}} />
                </form>
            </div>
        </>
    )
}
