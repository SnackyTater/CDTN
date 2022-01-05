import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Avatar, IconButton, LoadingBackdrop } from '../../../../component';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Person, Chat } from '@mui/icons-material';
import { getMatches } from '../../../../api/common/matchMaking';
import { HomeContext } from '../../../../context/home';

import './sidebar.scss';

export default function SidebarContent({setPopup, setSnackbar}) {
    const [isLoading, setLoading] = useState(true);
    const [cookies, setCookie] = useCookies('jwt'); 
    const {matchList: list, reloadMatchList} = useContext(HomeContext);
    const [reloadSidebar, setReloadSidebar] = reloadMatchList;
    const [matchList, setMatchList] = list;

    const history = useHistory();

    useEffect(() => {
        console.log('sidebar reload')
        let isMounted = true;
        setLoading(true);
        getMatches({token: cookies.jwt}).then((matchList) => {
            isMounted && setMatchList(matchList);
            isMounted && setLoading(false);
        }).catch((error) => {
            isMounted && setSnackbar({
                isOpen: true,
                severity: 'error',
                message: `cant load matches list due to ${error}`
            })
        })

        return () => {
            isMounted = false;
        }
    },[reloadSidebar]);


    return (
        <>
            {
                isLoading && <LoadingBackdrop 
                    config={{
                        width: '20vw',
                        right: 'auto'
                    }}
                />
            }
            
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