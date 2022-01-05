import { useState } from 'react';
import { InputAdornment, Backdrop } from '@mui/material';
import { AlternateEmail, Close } from '@mui/icons-material';

import { IconButton, TextInput, LoadingButton } from '../../../../../../component';
import { sendMailToResetPassword } from '../../../../../../api/common/account';

import './forgot-password.scss';

export default function ForgotPassword({isOpen, closeForm}) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState({status: true, message: ''});
    const [status, setStatus] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const sendEmailHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const status = await sendMailToResetPassword({email: email});
            setStatus(true);
            setLoading(false);
        } catch(error) {
            console.log(error)
            setLoading(false);
            setError({message: error.message, status: false})
        }
    }


    if(!isOpen) return null;
    return (
        <>
            <Backdrop open={isOpen}>
                <div className='forgot-password__form__container'>
                    <div className='forgot-password__form__close__container'>
                        <IconButton 
                            icon={<Close/>}
                            onClick={() => {closeForm()}}
                        />
                    </div>
                    <h3>forgot password ?</h3>
                    <p>please enter the email you use to create your account and we will send a link to reset password</p>
                    

                    <div className='forgot-password__form__input__container'>
                        <TextInput 
                            name={'email'}
                            error={error}
                            onChange={(e) => {setEmail(e.target.value)}} 
                        />
                    </div>

                    {status && <p>please check your email and follow the instruction</p>}
                    
                    <div className='forgot-password__form__button__container'>
                        <LoadingButton 
                            isLoading={isLoading}
                            onClick={sendEmailHandler}
                            placeholder={'send email'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <AlternateEmail />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>                
                </div>
            </Backdrop>
            
        </>
    )
}

