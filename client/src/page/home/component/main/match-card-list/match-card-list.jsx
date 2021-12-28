import {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { getRecommend, toggleLikeUser, toggleNopeUser } from '../../../../../api/common/matchMaking';
import MatchCard from '../match-card/match-card';

export default function MatchCardList() {
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

    const handleLike = async(e) => {
        console.log('a')
    }

    const handleNope = async(e) => {
        console.log('b')
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
            <MatchCard
                info={userList[index]}
                like={handleLike}
                nope={handleNope}
                prev={handlePrev}
                next={handleNext}
            />
        </>
    )
}
