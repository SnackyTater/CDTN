import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { LoadingBackdrop, Sidebar, Snackbar } from '../../component';
import { getUserInfo } from '../../api/common/user';

import SidebarContent from './component/sidebar/sidebar.jsx';
import Popup from './component/popup/popup';

import './home.scss';

export default function Home() {
    const [isLoading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({});
    const [sidebar, setSidebar] = useState({});
    const [alert, setAlert] = useState(false);
    const [cookies, setCookie] = useCookies('jwt');
    const [popup, setPopup] = useState({
        content: '',
        status: false
    });

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBSUQiOiI2MWM2ZGQzYTAzZDI3NmZjZjMxOTc2MWQiLCJVSUQiOiI2MWM2ZGQzYjAzZDI3NmZjZjMxOTc2MWYiLCJpYXQiOjE2NDA0ODk4MTk4NzAsImV4cCI6MTY0MDU3NjIxOTg3MH0.WVsIecsL23RbGE4B4NIHimsTBlqqIQWMaDQ2gaFmS90'
    setCookie('jwt', token);

    useEffect(() => {
        getUserInfo({token: token}).then((data) => {
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
                        />
                    }
                />
            </div>

            <div className='home__content__container'>
                <div className='home__content'>
                    <div style={{width: '100px', height: '100px', backgroundColor: 'black', position: 'absolute'}}/>
                    <div style={{width: '100px', height: '100px', backgroundColor: 'black', position: 'red'}}/>
                </div>

                <div className='home__popup'>
                    <Popup 
                        isOpen={popup.status}
                        info={popup.content}
                        closeForm={() => {setPopup({...popup, status: false})}}
                    />
                </div>
            </div>
            <Snackbar />
        </div>
    )
}

