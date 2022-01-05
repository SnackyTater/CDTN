import {useState, useContext} from 'react';
import {Favorite, Close} from '@mui/icons-material'
import {Avatar, IconButton} from '../../../../../component';
import { ageCalulator } from '../../../../../utils/utils';
import {HomeContext} from '../../../../../context/home';
import './map-icon.scss';

export default function MapIcon({userInfo, lat, lng, type, setSnackbar}) {
    const [display, setDisplay] = useState(false);
    const {recommendList: list, reloadMatchList} = useContext(HomeContext);
    const [reloadSidebar, setReloadSidebar] = reloadMatchList;
    const [recommendList, setRecommending] = list;

    const handleLike = async(targetID) => {
        // await toggleLikeUser({token: cookies.jwt, targetID});
        const newUserList = recommendList.filter((user) => user._id !== targetID)
        setRecommending(newUserList);
        setReloadSidebar(!reloadSidebar);
        setSnackbar({
            isOpen: true,
            message: 'like user successfully',
            severity: 'success'
        })
    }

    const handleNope = async(targetID) => {
        // await toggleNopeUser({token: cookies.jwt, targetID})
        const newUserList = recommendList.filter((user) => user._id !== targetID)
        setRecommending(newUserList);
        setSnackbar({
            isOpen: true,
            message: 'nope user successfully',
            severity: 'success'
        })
    }


    const typeController = (type) => {
        switch(type){
            case 'others': <>
                <p>{`name: ${userInfo.info.fullName}`}</p>
                <p>{`gender: ${userInfo.info.gender}`}</p>
                <p>{`age: ${ageCalulator(userInfo.info.DateofBirth)}`}</p>
                <p>{`${Math.floor(userInfo.distance)} km away`}</p>
            </>
            case 'match':
                return <>
                    <p>{`name: ${userInfo.info.fullName}`}</p>
                    <p>{`gender: ${userInfo.info.gender}`}</p>
                    <p>{`age: ${ageCalulator(userInfo.info.DateOfBirth)}`}</p>
                    <p>{`${Math.floor(userInfo.distance)} km away`}</p>
                </>
            case 'you':
                return <p>this is you</p>
            default: return;
        }
    }


    return (
        <div
            className="map-icon"
            lat={lat}
            lng={lng}
            onMouseEnter={() => {setDisplay(true)}}
            onMouseLeave={() => {setDisplay(false)}}
        >
            {
                display && <div className='map-icon__tooltip'>
                    {
                        typeController(type)
                    }
                </div>
            }

            <div className={`map-icon__background--${type}`}>
                <Avatar
                    image={userInfo?.info?.profileImage[0]?.imageURL}
                />
            </div>
        </div>
    )
}
