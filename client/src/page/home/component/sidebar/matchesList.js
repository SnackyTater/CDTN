import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { List, ListItem, ListItemAvatar, ListItemText, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

import CustomAvatar from '../../../../common/component/avatar-icon/avatar-icon';

import { getMatches } from '../../../../api/common/matchMaking';

export default function MatchesList({setLoading}) {
    const [matchList, setMatchList] = useState([]);
    const [cookies, setCookies] = useCookies('jwt');

    useEffect(() => {
        setLoading(true);
        setCookies('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBSUQiOiI2MWEyZGQzMjM3NmJhNjJlNGZhNzE1NmIiLCJVSUQiOiI2MWEyZGQzMjM3NmJhNjJlNGZhNzE1NmQiLCJpYXQiOjE2Mzk5MDQ4OTcyODcsImV4cCI6MTYzOTk5MTI5NzI4N30.rxCd-hHhuXQO41GJHzKl7UewEmko16zPXY-SroET1Y8')
        getMatches({ token: cookies.jwt }).then((list) => {
            setMatchList(list);
            setLoading(false);
        }).catch((err) => {
            console.log(err.message);
        } )
    }, [])

    return (
        <>
            {(matchList.length === 0) 
                ?   <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div>
                            there's no people who are matched with you, how about trying to like some one ?
                        </div>
                    </div>
                : <List>
                    {matchList.map((user, index) => <ListItem
                        key={index}
                        secondaryAction={
                            <IconButton>
                                <MoreHoriz />
                            </IconButton>
                        }
                    > 
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
