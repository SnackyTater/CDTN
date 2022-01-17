import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {Sidebar} from '../../component';
import {getUserInfo} from '../../api/common/user';
import {getChatList, getChatContent} from '../../api/common/chat';
import io from '../../socket/socket';

import SidebarContent from './component/sidebar/side-bar';
import ChatInterface from './component/main/chat-layout/chat';
import './chat.scss';

export default function Chat() {
    const [sidebar, setSidebar] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [room, setRoom] = useState('');
    const [cookies, setCookie] = useCookies('jwt');
    const history = useHistory();
    
    useEffect(() => {
        if(room.length === 0) setRoom(history?.location?.state?.roomID);

        getUserInfo({token: cookies.jwt}).then((userData) => {
            setSidebar({
                image: userData.info.profileImage[0].imageURL,
                fullName: userData.info.fullName,
                _id: userData._id
            })
        })
    }, [])

    return (
        <div className='chat'>
            <div className='chat__sidebar'>
                <Sidebar 
                    header={sidebar}
                    content={
                        <SidebarContent 
                            userID={sidebar._id} 
                            setRoom={(room) => {setRoom(room)}}
                        />
                    }
                />
            </div>
            <div className='chat__content'>
                    <div className='chat__content__box'>
                        <ChatInterface 
                            room={room}
                            userID={sidebar._id}
                        />
                    </div>
            </div>
        </div>
    )
}
