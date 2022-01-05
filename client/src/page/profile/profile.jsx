import { useState } from 'react';

import { LoadingBackdrop, Snackbar, Sidebar } from '../../component';

import SidebarContent from './component/sidebar/sidebar';
import FormProfile from './component/main/form/user/user';
import FormAccount from './component/main/form/account/account';
import FormSetting from './component/main/form/config/config';
import LogoutPopup from './component/main/popup/logout/logout';
import DeleteAccountPopup from './component/main/popup/delete/delete';

import './profile.scss';

export default function Profile() {
    const [isLoading, setLoading] = useState(false);
    const [form, setForm] = useState('profile');
    const [popup, setPopup] = useState(null);
    const [snackbar, setSnackbar] = useState({severity: null, message: null, isOpen: false});
    const [sidebarHeader, setSidebarHeader] = useState({avatar: '', name: ''});

    const formSwitch = (controller) => {
        switch(controller){
            case 'profile': 
                return <FormProfile 
                    setLoading={(status) => {setLoading(status)}}
                    setSnackbar={(content) => {setSnackbar(content)}}
                    setSidebarHeader={(content) => {setSidebarHeader(content)}}
                />;

            case 'account': 
                return <FormAccount 
                    setLoading={(status) => {setLoading(status)}}
                    setSnackbar={(content) => {setSnackbar(content)}}
                />;
            case 'search settings':
                return <FormSetting 
                    setLoading={(status) => {setLoading(status)}}
                    setSnackbar={(content) => {setSnackbar(content)}}
                />;
            default: return <FormProfile />;
        }
    }

    const popupSwitch = (controller) => {
        switch(controller){
            case 'logout': return <LogoutPopup closePopup={() => {setPopup(false)}}/>;
            case 'delete account': return <DeleteAccountPopup closePopup={() => {setPopup(false)}}/>;
            default: return null;
        }
    }

    return (
        <div className="profile">
            <div className='profile__sidebar'>
                <Sidebar 
                    header={sidebarHeader} 
                    content={
                        <SidebarContent 
                            navigateTo={setForm}
                            openPopup={setPopup} 
                        />
                    }
                />
            </div>
            
            <div className='profile__content'>
                {isLoading && <LoadingBackdrop 
                    config={{
                        width: '80%',
                        marginLeft: 'auto'
                    }}
                />}
                
                <div className='profile__content__popup'>
                    {
                        popupSwitch(popup)
                    }
                </div>
                <div className='profile__content__form'>
                    {
                        formSwitch(form)
                    }
                </div>
            </div>
            <Snackbar
                message={snackbar.message}
                severity={snackbar.severity}
                isOpen={snackbar.isOpen}
                closeSnackbar={() => {setSnackbar({...snackbar, isOpen: false})}}
            />
        </div>
    )
}