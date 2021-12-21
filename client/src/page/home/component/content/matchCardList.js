import {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie'

import { getRecommend } from '../../../../api/common/matchMaking';

export default function MatchCardList({setLoading}) {
    const [matchCardList, setMatchCardList] = useState([]);
    const [cookies] = useCookies('jwt');

    useEffect(() => {
        setLoading(true);
        getRecommend({token: cookies.jwt}).then((list) => {
            setMatchCardList(list);
            setLoading(false);
        })
    }, [])

    return (
        <div>
            {matchCardList.map((user) => <div style={{display: 'fixed'}}>
                aaaa dcm may
            </div>)}
        </div>
    )
}
