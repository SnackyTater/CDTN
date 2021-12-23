import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { List } from '@mui/material';
import { Person, Chat, Delete } from '@mui/icons-material';

//import API
import { getMatches } from '../../../../../api/common/matchMaking';

//import Custom shit
import CustomListItem from './listItem';
import CustomIconButton from '../../../../../common/component/button/icon-button/IconButton';

export default function MatchesList({setLoading}) {
    const [matchList, setMatchList] = useState([]);
    const [cookies, setCookies] = useCookies('jwt');

    useEffect(() => {
        setLoading(true);
        setCookies('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBSUQiOiI2MWEyZGQzMjM3NmJhNjJlNGZhNzE1NmIiLCJVSUQiOiI2MWEyZGQzMjM3NmJhNjJlNGZhNzE1NmQiLCJpYXQiOjE2Mzk5OTc4NTQzMDAsImV4cCI6MTY0MDA4NDI1NDMwMH0.UVfvR0suxlMQn5bT91YNAQqZwebK9WLxGFpBxjg4uV0');
        getMatches({ token: cookies.jwt }).then((list) => {
            setMatchList([...list, ...list]);
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
                    {
                        matchList.map((user, index) => 
                        <CustomListItem 
                            key={index}
                            avatar={user.profileImage[0].imagePublicURL}
                            mainText={user.fullName}
                            secondaryAction={
                                <div>
                                    <CustomIconButton 
                                        icon={ <Person/> }
                                        onClick={() => {console.log('a')}}
                                    />
                                    <CustomIconButton 
                                        icon={ <Chat/> }
                                        onClick={() => {console.log('a')}}
                                    />
                                    <CustomIconButton 
                                        icon={ <Delete/> }
                                        onClick={() => {console.log('a')}}
                                    />
                                </div>
                            }
                        />)
                    }
                </List>
            }
        </>
    )
}
