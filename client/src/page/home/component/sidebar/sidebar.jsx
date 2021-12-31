import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Avatar, IconButton } from '../../../../component';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Person, Chat } from '@mui/icons-material';
import { getMatches } from '../../../../api/common/matchMaking';

import './sidebar.scss';

export default function SidebarContent({setPopup, reload}) {
    const [cookies, setCookie] = useCookies('jwt'); 
    const [matchList, setMatchList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getMatches({token: cookies.jwt}).then((matchList) => {
            setMatchList([...matchList, ...matchList])
        })
    },[reload]);


    return (
        <>
            {
                (matchList?.length === 0) 
                ?   <div className='sidebar__content__message'>
                        <div>
                            <div/>
                            <p>look like you are not matched with anyone, why not trying to like some one ?</p>
                        </div>
                        
                    </div> 
                :   <List>
                        {
                            matchList.map((user, index) => 
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <>
                                        <IconButton
                                            onClick={() => {setPopup({status: true, content: user})}}
                                            icon={<Person />}
                                        />
                                        <IconButton
                                            onClick={() => {history.push('/chat', {roomID: user.chat._id})}}
                                            icon={<Chat />}
                                        />
                                    </>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar image={user?.info?.profileImage[0]?.imageURL}/>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{color: 'rgba(0, 0, 0, 0.5)'}}
                                    primary={user?.info?.fullName}
                                    secondary={user?.chat[0]?.message && `from ${user.info.fullName}: ${user?.chat[0]?.message}`}
                                />
                            </ListItem>)
                        }
                    </List>
            }
        </>
    )
}