import React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import './logout.scss';

export default function Logout({closePopup}) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const history = useHistory();

    const logoutHandler = (e) => {
        history.push('/');
        // removeCookie('jwt');
    }

    const closePopupHandler = (e) => {
        closePopup();
    }

    return (
        <div className='logout__container'>
            <p>you sure you want to logout</p>
            <div className='logout__button__container'>
                <button 
                    className='logout__button'
                    onClick={logoutHandler}
                >ok</button>

                <button 
                    className='logout__button'
                    onClick={closePopupHandler}
                >cancel</button>
            </div>
        </div>
    )
}
