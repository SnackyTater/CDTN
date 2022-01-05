import React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { DefaultBackdrop, DefaultButton } from '../../../../../../component';

import './delete.scss';

import {deleteAccount} from '../../../../../../api/common/account';

export default function DeleteAccount({closePopup}) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const history = useHistory();

    const deleteHandler = async(e) => {
        // await deleteAccount({token: cookies.jwt}).catch((err) => {console.log(err)})
        removeCookie('jwt');
        history.push('/');
    }

    const closePopupHandler = (e) => {
        closePopup();
    }

    return (
        <DefaultBackdrop
            closeForm={closePopupHandler}
            isOpen={true}
        >
            <div className='delete__container'>
                <h2>Delete Account</h2>
                <p>are you really sure you want to delete your account ? Once you've done it, there's no going back</p>
                <div className='delete__button__container'>
                    <DefaultButton 
                        placeholder={'delete account'}
                        onClick={deleteHandler}
                    />
                </div>
            </div>
        </DefaultBackdrop>
    )
}
