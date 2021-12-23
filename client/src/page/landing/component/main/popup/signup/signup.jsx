import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputAdornment, Backdrop } from '@mui/material';
import { AlternateEmail, Close } from '@mui/icons-material';

import { IconButton, TextInput, LoadingButton } from '../../../../../../component';
import { sendEmail } from '../../../../../../api/common/account';

import './signup.scss';

export default function Signup({isOpen, closeForm}) {
    const [email, setEmail] = useState('');
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState({status: true, message: ''});
    const [display, setDisplay] = useState('email');
    const [isLoading, setLoading] = useState(false);

    const history = useHistory();

    const sendEmailHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            console.log('ssss')
            const {code} = await sendEmail({email: email});
            console.log(code);
            setCode(code);
            setDisplay('verificate');
        } catch(error) {
            console.log(error)
            setLoading(false);
            setError({message: error.message, status: false})
        }
    }

    const validateHandler = (e) => {    
        if(code === input)
            history.push('/signup', {email: email})
        else
            setError({status: false, message: 'validation code does not match'})
    }

    const formController = (form) => {
        switch(form){
            case 'verificate': {
                return <>
                    <div className='signup__form__input__container'>
                        <TextInput
                            def
                            error={error}
                            onChange={(e) => {setInput(e.target.value)}}               
                        />
                    </div>
                    <div className='signup__form__button__container'>
                        <LoadingButton 
                            isLoading={false}
                            onClick={validateHandler}
                            placeholder={'validate'}
                        />
                    </div>
                </>
            }
            default: {
                return <>
                <div className='signup__form__input__container'>
                    <TextInput 
                        name={'email'}
                        error={error}
                        onChange={(e) => {setEmail(e.target.value)}} 
                    />
                </div>
                <div className='signup__form__button__container'>
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
            </>
            }
        }
    }

    if(!isOpen) return null;
    return (
        <>
            <Backdrop open={isOpen}>
                <div className='signup__form__container'>
                    <div className='signup__form__close__container'>
                        <IconButton 
                            icon={<Close/>}
                            onClick={() => {closeForm()}}
                        />
                    </div>
                    {
                        formController(display)
                    }
                </div>
            </Backdrop>
            
        </>
    )
}

