import {useEffect, useState, useReducer} from 'react';
import {useCookies} from 'react-cookie';

import { IconButton, InputAdornment } from '@mui/material';
import { Lock, Mail, PhoneAndroid} from '@mui/icons-material';

import { LoadingButton, TextInput } from '../../../../../../component';
import { checkError } from '../../../../../../utils/utils';
import { acccountAction, accountInitialState, accountReducer } from '../../../../../../store';
import { getAccountInfo, updateAccount } from '../../../../../../api/common/account';

import './account.scss';

export default function AccountForm({setLoading, setSnackbar}) {
    const [state, dispatch] = useReducer(accountReducer, accountInitialState);
    const [checker, setChecker] = useState(false);
    const [cookies, setCookie] = useCookies('jwt');
    const [disableStatus, setDisable] = useState({mobile: true, email: true});

    const { SET_ACCOUNT_INFO, SET_ACCOUNT } = acccountAction;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBSUQiOiI2MWM2ZGQzYTAzZDI3NmZjZjMxOTc2MWQiLCJVSUQiOiI2MWM2ZGQzYjAzZDI3NmZjZjMxOTc2MWYiLCJpYXQiOjE2NDA0ODk4MTk4NzAsImV4cCI6MTY0MDU3NjIxOTg3MH0.WVsIecsL23RbGE4B4NIHimsTBlqqIQWMaDQ2gaFmS90'
    setCookie('jwt', token);
    
    useEffect(() => {
        setLoading(true);
        getAccountInfo({token: cookies.jwt}).then((data) => {
            dispatch({
                type: SET_ACCOUNT,
                payload: data
            })
            setLoading(false);
        }).catch((error) => {
            setSnackbar({
                isOpen: true,
                severity: 'error',
                message: `cant load user info due to ${error.message}`
            })
        })
    },[])

    const accountChangeHandler = (e) => {
        const {value, name} = e.target;
        dispatch({
            type: SET_ACCOUNT_INFO,
            payload: { name, value, validate: true }
        })
    }

    const saveAccountHandler = async(e) => {
        const checker = checkError(state.error);
        if(checker){
            try{
                const {modifiedCount, matchedCount} = await updateAccount({token: cookies.jwt, body: state.account});
                if(modifiedCount && matchedCount) setSnackbar({
                    isOpen: true,
                    severity: 'success',
                    message: 'account updated successfully'
                })
                else setSnackbar({
                    isOpen: true,
                    severity: 'info',
                    message: 'account hasnt been changed'
                })
            } catch(error) {
                setSnackbar({
                    isOpen: true,
                    severity: 'error',
                    message: `cant save user info due to ${error.message}`
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
        // {
        //     name: 'password2',
        //     label: 're-enter password',
        //     type: 'password',
        // }
    ]

    return (
        <div className='profile__form__container'>
            <div className='profile__form__content'>
                {   
                    formList.map((item) => <TextInput
                        key={item.name}
                        placeholder={state.account[item.name]}
                        disableStatus={disableStatus[item?.name]}
                        label={item?.label ? item?.label : item?.name}
                        name={item.name}
                        type={item.type}
                        error={state.error[item?.name]}
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
            <div className='profile__content__form__button'>
                <LoadingButton onClick={saveAccountHandler} placeholder={'save'} width={'200px'}/>
            </div>
        </div>
    )
}
