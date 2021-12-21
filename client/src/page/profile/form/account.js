import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';

import { IconButton, InputAdornment } from '@mui/material';
import { Lock, Mail, PhoneAndroid} from '@mui/icons-material';

import CustomTextInput from '../../../common/component/input/text/input';
import LoadingButton from '../../../common/component/button/loading-button/loading-button';

import accountHook from '../../../common/hooks/accountInfo/account';

import {getAccountInfo, updateAccount} from '../../../api/common/account';

export default function AccountForm({setLoading, setSnackbar}) {
    const { account, SetAccount, setAccount, accountSubmitChecker, error} = accountHook();
    const [disableStatus, setDisable] = useState({mobile: true, email: true});
    const [cookies] = useCookies('jwt');

    useEffect(() => {
        setLoading(true);
        getAccountInfo({token: cookies.jwt}).then((data) => {
            setAccount(data);
        }).catch((err) => {
            setSnackbar({severity: 'error', message: `cant load account info due to ${err.message}`});
        })
    },[])

    const accountChangeHandler = (e) => {
        SetAccount(e, true);
    }

    const saveAccountHandler = async(e) => {
        const checker = accountSubmitChecker('username');

        if(checker){
            try{
                const status = await updateAccount({token: cookies.jwt, body: account});
                const {modifiedCount, matchedCount} = status
                if(modifiedCount && matchedCount) setSnackbar({
                    severity: 'success',
                    message: 'account updated successfully'
                })
                else setSnackbar({
                    severity: 'info',
                    message: 'account hasnt been changed'
                })
            } catch(err) {
                setSnackbar({
                    severity: 'error',
                    message: err.message
                })
            }
            
        } 
    }

    const formList = [
        {
            name: 'email',
            iconStart: <Mail/>,
            iconEnd: <Lock/>
        },
        {
            name: 'mobile',
            iconStart: <PhoneAndroid/>,
            iconEnd: <Lock/>
        },
        {
            name: 'password',
            type: 'password',
        },
        {
            name: 'password2',
            label: 're-enter password',
            type: 'password',
        }
    ]

    return (
        <div className='profile__form__container'>
            <div className='profile__form__content'>
                {   
                    formList.map((item) => <CustomTextInput
                        key={item.name}
                        placeholder={account[item.name]}
                        disableStatus={disableStatus[item?.name]}
                        label={item?.label ? item?.label : item?.name}
                        name={item.name}
                        type={item.type}
                        error={error[item?.name]}
                        onChange={accountChangeHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    {item?.iconStart}
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <IconButton className='input__button' 
                                    onClick={() => {
                                        setDisable({...disableStatus, [item.name]: !disableStatus[item.name]})
                                    }}
                                >
                                    {item?.iconEnd}
                                </IconButton>)
                        }}
                    />)
                }
            </div>
            <div className='profile__form__button'>
                <LoadingButton onClick={saveAccountHandler} placeholder={'save'} width={'200px'}/>
            </div>
        </div>
    )
}
