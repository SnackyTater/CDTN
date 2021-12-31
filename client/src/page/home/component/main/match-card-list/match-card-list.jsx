import {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { SentimentVeryDissatisfied } from '@mui/icons-material';
import { getRecommend, toggleLikeUser, toggleNopeUser } from '../../../../../api/common/matchMaking';

import MatchCard from '../match-card/match-card';
import './match-card-list.scss'

export default function MatchCardList({setReload, setSnackbar}) {
    const [userList, setUserList] = useState([]);
    const [getMore, setGetMore] = useState(false);
    const [index, setIndex] = useState(0);
    const [cookies, setCookie] = useCookies('jwt');

    useEffect(() => {
        getRecommend({token: cookies.jwt}).then((list) => {
            console.log('list length', list.length)
            setUserList(list);
            setIndex(0);
        })
    }, [])

    const handleLike = async(targetID) => {
        // await toggleLikeUser({token: cookies.jwt, targetID});
        const newUserList = userList.filter((user) => user._id !== targetID)
        setUserList(newUserList);
        setSnackbar({
            isOpen: true,
            message: 'like user successfully',
            severity: 'success'
        })
    }

    const handleNope = async(targetID) => {
        // await toggleNopeUser({token: cookies.jwt, targetID})
        const newUserList = userList.filter((user) => user._id !== targetID)
        setUserList(newUserList);
        setSnackbar({
            isOpen: true,
            message: 'nope user successfully',
            severity: 'success'
        })
    }

    const handleNext = async(e) => {
        if(index < userList.length - 1) setIndex(index + 1);
        else setIndex(0);
    }

    const handlePrev = (e) => {
        if(index > 0) setIndex(index - 1);
    }

    return (
        <>
            {
                (userList.length === 0) ? <div className='match-card-list__message'>
                                            <div>
                                                <SentimentVeryDissatisfied sx={{width: '150px', height: '150px', color: 'rgba(0,0,0,0.3)'}}/>
                                                sorry there's not any one that fit your criteria right now D:
                                            </div>
                                            
                                        </div>
                                      : <MatchCard
                                            info={userList[index]}
                                            value={userList[index]?._id}
                                            like={handleLike}
                                            nope={handleNope}
                                            prev={handlePrev}
                                            next={handleNext}
                                        />
            }
        </>
    )
}
