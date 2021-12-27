import React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import './delete.scss';

import {deleteAccount} from '../../../../../../api/common/account';

export default function DeleteAccount({closePopup}) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const history = useHistory();

    const deleteHandler = async(e) => {
        // await deleteAccount({token: cookies.jwt}).catch((err) => {console.log(err)})
        // removeCookie('jwt');
        history.push('/');
    }

    const closePopupHandler = (e) => {
        closePopup();
    }

    return (
        <div className='logout__container'>
            <p>are you really sure you want to delete your account. once you've done it, there's no going back</p>
            <div className='logout__button__container'>
                <button 
                    className='logout__button'
                    onClick={deleteHandler}
                >ok</button>

                <button 
                    className='logout__button'
                    onClick={closePopupHandler}
                >cancel</button>
            </div>
        </div>
    )
}
