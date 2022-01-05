import React, {useEffect, useState, useContext} from 'react';
import { useCookies } from 'react-cookie';
import { getRecommend } from '../../../../api/common/matchMaking';
import { Filter, Map , Replay } from '@mui/icons-material';
import { IconButton, LoadingBackdrop } from '../../../../component';
import { HomeContext } from '../../../../context/home';

import MatchCardList from './match-card-list/match-card-list';
import MatchMap from './map/map';

export default function HomeMain({setSnackbar}) {
    // const [recommendList, setRecommendList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = useState('card');
    const [cookies] = useCookies('jwt');

    const {recommendList: list, reloadRecommend} = useContext(HomeContext);
    const [recommendList, setRecommendList] = list;
    const [reloadMain, setReloadMain] = reloadRecommend;


    const token = cookies.jwt;

    useEffect(() => {
        let isMounted = true;
        setLoading(true)
        isMounted && getRecommend({token}).then((userList) => {
            isMounted && setRecommendList(userList);
            isMounted && setLoading(false);
        }).catch((error) => {
            setSnackbar({
                severity: 'error',
                isOpen: true,
                message: `can't load recommend due to ${error.message}`
            })
        })

        return () => { isMounted = false }
    }, [reloadMain])

    const toggleButtonList = [
        {
            icon: <Filter />,
            onClick: () => {setDisplay('card')}
        },
        {
            icon: <Map />,
            onClick: () => {setDisplay('map')}
        },
        {
            icon: <Replay />,
            onClick: () => {setReloadMain(!reloadMain)}
        }
    ]

    return (
        <>
            {
                loading &&  <LoadingBackdrop 
                    config={{
                        width: '80vw',
                        left: 'auto'
                    }}
                />
            }
            {
                (display === 'card') ?  <MatchCardList 
                                            setSnackbar={(content) => {setSnackbar(content)}}
                                        />
                                     :  <MatchMap
                                            setSnackbar={(content) => {setSnackbar(content)}}
                                        />
            }
            <div className='home__side-button'>
                {
                    toggleButtonList.map((button, index) => {
                        return <IconButton
                            key={index}
                            onClick={() => {button.onClick()}}
                        >
                            {button.icon}
                        </IconButton>
                    })
                }
            </div>
        </>
    )
}
