import React, { useEffect, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import { LoadingBackdrop, Sidebar, Snackbar, IconButton } from '../../component';
import { getUserInfo } from '../../api/common/user';
import { HomeContext, HomeContextStore } from '../../context/home';

import SidebarContent from './component/sidebar/sidebar.jsx';
import Popup from './component/popup/popup';
import HomeMain from './component/main/main';

import './home.scss';

export default function Home() {
    //state for display
    const [isLoading, setLoading] = useState(false);
    const [popup, setPopup] = useState({ content: '', status: false });
    const [snackbar, setSnackbar] = useState({severity: '', message: '', isOpen: false});

    //context
    const {userInfo: user} = useContext(HomeContext);
    const [userInfo, setUserInfo] = user;

    //state for function
    const [mainReload, setMainReload] = useState(false);

    //hooks
    const [cookies, setCookie] = useCookies('jwt');
    const history = useHistory();

    const token = cookies.jwt;

    //only load 1 time after render
    useEffect(() => {
        if(!cookies.jwt) history.push('/');

        let isMounted = true;
        getUserInfo({token}).then((userInfo) => {
            isMounted && setUserInfo(userInfo);
        }).catch((error) => {
            setSnackbar({
                severity: 'error',
                isOpen: true,
                message: `can't load user info due to ${error.message}`
            })
        })

        return () => {
            isMounted = false;
        }
    }, [])

    useEffect(() => {

    }, [])

    return (
            <div className='home'>
                {
                    (false) && <LoadingBackdrop/>
                }
                <div className='home__sidebar'>
                    <Sidebar header={userInfo}>
                        <SidebarContent 
                            setPopup={(config) => {setPopup(config)}}
                            setSnackbar={(content) => {setSnackbar(content)}}
                        />
                    </Sidebar>
                </div>
                <div className='home__main'>
                    <HomeMain 
                        reload={mainReload}
                        setMainReload={(content) => {setMainReload(content)}}
                        setSnackbar={(content) => {setSnackbar(content)}}
                    />
                </div>
                <Snackbar 
                    severity={snackbar.severity}
                    message={snackbar.message}
                    isOpen={snackbar.isOpen}
                    closeSnackbar={() => {setSnackbar({...snackbar, isOpen: false})}}
                />
                <Popup 
                    isOpen={popup.status}
                    info={popup.content}
                    closeForm={() => {setPopup({...popup, status: false})}}
                />
            </div>
    )
}