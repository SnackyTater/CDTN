import {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

import {getChatList} from '../../../../api/common/chat';

export default function chatList({setLoading}) {
    const [cookies, setCookies] = useCookies('jwt');
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        setLoading(true);
        getChatList({token: cookies.jwt}).then((list) => {
            setChatList(list);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <>
            {(chatList.length === 0) 
                ?   <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div>
                            there's no people who are matched with you, how about trying to like some one ?
                        </div>
                    </div>
                : <List>
                    {matchList.map((user) => <ListItem> 
                        <ListItemAvatar>
                            <CustomAvatar 
                                image={user.profileImage[0]} 
                                config={{bgColor: '#fff'}}
                                color={'white'}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={user.fullName} sx={{color: 'black'}} />
                    </ListItem>
                    )}
                </List>
            }
        </>
    )
}
