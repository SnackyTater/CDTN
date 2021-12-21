import { useState } from 'react';

import './profile.css';

//import component
import Loading from '../../common/component/loading/loading';
import SnackbarNotification from '../../common/component/snackbar-notification/snackbar-notification';
import Overlay from '../../common/component/overlay/overlay';

//import modules
import SideBar from '../../modules/sidebar/side-bar';

//import content
import SidebarContent from './sidebar-content/sidebar-content';
import FormProfile from './form/profile';
import FormAccount from './form/account';
import FormSetting from './form/setting';
import LogoutPopup from './popup/logout/logout';
import DeleteAccountPopup from './popup/deleteAccount/deleteAccount';

export default function Profile() {
    const [isLoading, setLoading] = useState(false);
    const [form, setForm] = useState('profile');
    const [popup, setPopup] = useState(null);
    const [snackbar, setSnackbar] = useState({severity: null, message: null});
    const [avatar, setAvatar] = useState('');
    const [fullName, setFullName] = useState('user');

    const formSwitch = (controller) => {
        switch(controller){
            case 'profile': 
                return <FormProfile 
                    setLoading={(status) => {setLoading(status)}}
                    setSnackbar={(content) => {setSnackbar(content)}}
                    setImage={(image) => {setAvatar(image)}}
                    setName={(name) => {setFullName(name)}}
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
        <div className="profile__container">
            <div className='profile__sidebar'>
                <SideBar 
                    header={{image: avatar, fullName}} 
                    content={
                        <SidebarContent 
                            navigateTo={setForm}
                            openPopup={setPopup} 
                        />
                    }
                />
            </div>
            
            <div className='profile__content'>
                {(isLoading) ? <Loading /> : null}
                <div className='profile__form__popup'>
                    {
                        popupSwitch(popup)
                    }
                </div>
                <div className='profile__content__container'>
                    {
                        formSwitch(form)
                    }
                </div>
            </div>
            <SnackbarNotification 
                message={snackbar.message}
                severity={snackbar.severity}
            />
        </div>
    )
}