import React, {useContext, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import MapIcon from '../map-icon/map-icon';

import { HomeContext } from '../../../../../context/home';

import './map.scss'

const API_KEY = 'AIzaSyCAAzqUvaII606-BXSc2YjSMWMEdRw9JF4';

export default function Map({setSnackbar}) {
    const {userInfo: user, matchList: list1, recommendList: list2} = useContext(HomeContext);
    const [userInfo, setUserInfo] = user;
    const [matchList, setMatchList] = list1;
    const [recommendList, setRecommending] = list2;

    const coordinates = {
        lat: userInfo?.matchMaking?.config?.location?.coordinates[1],
        lng: userInfo?.matchMaking?.config?.location?.coordinates[0],
    }

    console.log('map', userInfo)

    return (
        <div style={{width: '70vw', height: '90vh'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: API_KEY}}
                defaultCenter={coordinates}
                defaultZoom={17}
            >
                {/* this is your icon */}
                <MapIcon 
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    userInfo={userInfo}
                    type={'you'}
                />

                {/* this is your matches */}
                {
                    matchList.map((user) => <MapIcon 
                        key={userInfo._id}
                        lat={userInfo.matchMaking?.config?.location?.coordinates[1]}
                        lng={userInfo.matchMaking?.config?.location?.coordinates[0]}
                        userInfo={user}
                        type={'match'}
                    />)
                }

                {/* this is your recommend */}
                {
                    recommendList.map((userInfo) => {
                        console.log(userInfo.matchMaking?.config?.location?.coordinates[1]);
                        return <MapIcon
                            key={userInfo._id}
                            userInfo={userInfo}
                            type={'others'}
                            lat={userInfo.matchMaking?.config?.location?.coordinates[1]}
                            lng={userInfo.matchMaking?.config?.location?.coordinates[0]}
                            setSnackbar={(content) => {setSnackbar(content)}}
                        />
                    })
                }
            </GoogleMapReact>
        </div>
    )
}
