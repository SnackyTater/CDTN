import React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { DefaultBackdrop, DefaultButton } from '../../../../../../component';

import './logout.scss';

export default function Logout({closePopup}) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const history = useHistory();

    const logoutHandler = (e) => {
        history.push('/');
        removeCookie('jwt');
    }

    const closePopupHandler = (e) => {
        closePopup();
    }

    return (
        <DefaultBackdrop
            isOpen={true}
            closeForm={closePopupHandler}
            
        >
            <div className='logout__container'>
                <h2>log out</h2>
                <p>you sure you want to logout ?</p>
                <div className='logout__button__container'>
                    <DefaultButton 
                        onClick={logoutHandler}
                        placeholder={'log out'}
                    />
                </div>
            </div>
        </DefaultBackdrop>
    )
}
