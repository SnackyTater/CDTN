import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { InputAdornment, Backdrop } from '@mui/material';
import { Person, Password, Close } from '@mui/icons-material';

import { IconButton, TextInput, LoadingButton } from '../../../../../../component';
import { login } from '../../../../../../api/common/account';

import './login.scss';

export default function Login({isOpen, closeForm}) {
    const [loginInfo, setLoginInfo] = useState({ identityVerification: '', password: '' });
    const [error, setError] = useState({ identityVerification: '', password: '' });
    const [cookies, setCookie] = useCookies('jwt');
    const history = useHistory();

    const [isLoading, setLoading] = useState(false);

    const fieldChangeHandler = (e) => {
        const {value, name} = e.target;
        setLoginInfo({...loginInfo, [name]: value});
    }

    const loginHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            
            const {access_token} = await login({
                username: loginInfo.identityVerification,
                password: loginInfo.password,
            })
            setCookie('jwt', access_token);
            history.push('/home');
        } catch(error) {
            setLoading(false);
            if(error.message.includes('password'))
                setError({password: {message:'wrong password', status: false}})
            else
                setError({identityVerification: {message:'wrong username', status: false}})
        }
    }

    const fieldList = [
        {
            name: 'identityVerification',
            icon: <Person />
        },
        {
            name: 'password',
            type: 'password',
            icon: <Password />
        }
    ]



    if(!isOpen) return null;
    return (
        <>
            <Backdrop open={isOpen}>
                <div className='login__container'>
                    <div className='login__close__container'>
                        <IconButton 
                            icon={<Close/>}
                            onClick={() => {closeForm()}}
                        />
                    </div>
                    <div className='login__input__container'>
                        {
                            fieldList.map((item, index) => <TextInput 
                                key={index}
                                name={item.name}
                                type={item.type}
                                error={error[item?.name]}
                                onChange={fieldChangeHandler}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            {item?.icon}
                                        </InputAdornment>
                                    )
                                }}  
                            />)
                        }
                        <a href='/forgot-password'>forgot password ?</a>
                    </div>
                    <div className='login__button__container'>
                        
                        <LoadingButton 
                            isLoading={isLoading}
                            onClick={loginHandler}
                            placeholder={'login'}
                        />
                    </div>
                </div>
            </Backdrop>
            
        </>
    )
}

