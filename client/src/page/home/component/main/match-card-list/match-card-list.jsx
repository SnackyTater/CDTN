import {useState, useContext, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { SentimentVeryDissatisfied } from '@mui/icons-material';
import { toggleLikeUser, toggleNopeUser } from '../../../../../api/common/matchMaking';
import { HomeContext } from '../../../../../context/home';

import MatchCard from '../match-card/match-card';
import './match-card-list.scss'

export default function MatchCardList({setSnackbar}) {
    const [index, setIndex] = useState(0);
    const {recommendList: list, reloadMatchList} = useContext(HomeContext);
    const [reloadSidebar, setReloadSidebar] = reloadMatchList;
    const [recommendList, setRecommending] = list;
    const [cookies] = useCookies('jwt');
    const token = cookies.jwt;


    const handleLike = async(targetID) => {
        console.log(targetID);
        try{
            const {message} = await toggleLikeUser({token: cookies.jwt, targetID});
            const newUserList = recommendList.filter((user) => user._id !== targetID)
            setRecommending(newUserList);
            setIndex(0);
            if(message.includes('like')){
                setSnackbar({
                    isOpen: true,
                    message: 'like user successfully',
                    severity: 'success'
                })
            }
            if(message.includes('match')){
                setReloadSidebar(!reloadSidebar)
                setSnackbar({
                    isOpen: true,
                    message: message,
                    severity: 'success'
                })
            }

        }catch(error){
            setSnackbar({
                isOpen: true,
                message: 'something has gone wrong',
                severity: 'error'
            })
        }
    }

    const handleNope = async(targetID) => {
        try{
            const {message} = await toggleNopeUser({token: cookies.jwt, targetID})
            const newUserList = recommendList.filter((user) => user._id !== targetID)
            setRecommending(newUserList);
            setIndex(0)
            if(message.includes('nope')){
                setSnackbar({
                    isOpen: true,
                    message: 'nope user successfully',
                    severity: 'success'
                })
            }
            else{
                throw new Error('something has gone wrong')
            }  
        }catch(error){
            setSnackbar({
                isOpen: true,
                message: 'something has gone wrong',
                severity: 'error'
            })
        }
    }

    const handleNext = async(e) => {
        if(index < recommendList.length - 1) setIndex(index + 1);
        else setIndex(0);
    }

    const handlePrev = (e) => {
        if(index > 0) setIndex(index - 1);
    }

    return (
        <>
            {
                (recommendList?.length === 0) ? <div className='match-card-list__message'>
                                            <div>
                                                <SentimentVeryDissatisfied sx={{width: '150px', height: '150px', color: 'rgba(0,0,0,0.3)'}}/>
                                                sorry there's not any one that fit your criteria right now D:
                                            </div>
                                            
                                        </div>
                                      : <MatchCard
                                            info={recommendList[index]}
                                            value={recommendList[index]?._id}
                                            like={handleLike}
                                            nope={handleNope}
                                            prev={handlePrev}
                                            next={handleNext}
                                        />
            }
        </>
    )
}
