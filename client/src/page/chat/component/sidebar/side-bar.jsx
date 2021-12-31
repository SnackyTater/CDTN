import React, {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import {getChatList} from '../../../../api/common/chat';

import { Avatar } from '../../../../component';
import { List, ListItem, ListItemAvatar, ListItemText, AvatarGroup } from '@mui/material';

export default function Sidebar({userID, setRoom}) {
    const [chatList, setChatList] = useState(null);
    const [cookies, setCookie] = useCookies('jwt');
    
    useEffect(() => {
        getChatList({token: cookies.jwt}).then((chatList) => {
            setChatList(chatList);
        })
    }, []);

    const getName = (user) => {
        let name = '';
        user.map((user) => {
            if(user._id !== userID) name = user?.info?.fullName 
        })
        return name;
    }

    const getLastMessage = (chat) => {
        const lastMessage = chat?.log[chat.log.length-1];
        let name = '';
        chat.participant.map((user) => {
            if(user._id === lastMessage?.from)
                name = user.info.fullName
        });

        console.log(lastMessage, name);
        return `from ${name}: ${lastMessage.message}`
    }

    return (
        <>
            <List>
                {
                    chatList?.map((chat,index) => {
                        console.log(chat?.participant[0]?.info?.profileImage[0]?.imageURL)
                        return <ListItem 
                            key={index}
                            sx={{
                                "&.MuiListItem-root:hover": {
                                    bgcolor: 'rgba(0,0,0,0.1)',
                                    cursor: 'pointer'
                                }
                            }}
                            onClick={() => {setRoom(chat._id)}}
                        >
                            <ListItemAvatar>
                                <AvatarGroup>
                                    <Avatar alt="user" image={chat?.participant[0]?.info?.profileImage[0]?.imageURL}/>
                                    <Avatar alt="user" image={chat?.participant[1]?.info?.profileImage[0]?.imageURL}/>
                                </AvatarGroup>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{marginLeft: '10px'}}
                                primary={getName(chat.participant)}
                                secondary={getLastMessage(chat)}
                            />
                        </ListItem>
                    })  
                }
            </List>
        </>
    )
}
