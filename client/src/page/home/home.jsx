import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { LoadingBackdrop, Sidebar, Snackbar } from '../../component';
import { getUserInfo } from '../../api/common/user';

import SidebarContent from './component/sidebar/sidebar.jsx';
import Popup from './component/popup/popup';
import MatchCardList from './component/main/match-card-list/match-card-list';

import './home.scss';

export default function Home() {
    const [isLoading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({severity: '', message: '', isOpen: false});
    const [sidebar, setSidebar] = useState({});
    const [reloadSidebar, setReloadSidebar] = useState(true);
    
    const [cookies, setCookie] = useCookies('jwt');
    const [popup, setPopup] = useState({
        content: '',
        status: false
    });

    useEffect(() => {
        getUserInfo({token: cookies.jwt}).then((data) => {
            setSidebar({image: data.info.profileImage[0].imageURL, fullName: data.info.fullName});
        }).catch((error) => {
            setSnackbar({
                isOpen: true,
                severity: 'error',
                message: `something gone wrong`
            })
        })
    }, [])

    return (
        <div className='home__container'>
            {
                (false) && <LoadingBackdrop/>
            }

            <div className='home__sidebar__container'>
                <Sidebar 
                    header={sidebar}
                    content={
                        <SidebarContent 
                            setPopup={(config) => {setPopup(config)}}
                            reload={reloadSidebar}
                        />
                    }
                />
            </div>

            <div className='home__content__container'>
                <div className='home__content'>
                    <MatchCardList 
                        setReload={() => {}}
                        setSnackbar={(content) => {setSnackbar(content)}}
                    />
                </div>

                <div className='home__popup'>
                    <Popup 
                        isOpen={popup.status}
                        info={popup.content}
                        closeForm={() => {setPopup({...popup, status: false})}}
                    />
                </div>
            </div>
            <Snackbar 
                severity={snackbar.severity}
                message={snackbar.message}
                isOpen={snackbar.isOpen}
                closeSnackbar={() => {setSnackbar({...snackbar, isOpen: false})}}
            />
        </div>
    )
}

