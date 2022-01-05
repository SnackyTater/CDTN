import React, {useState, useReducer, useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Navbar, TextInput, LoadingButton } from '../../component';
import { resetPassword } from '../../api/common/account';
import { checkError } from '../../utils/utils';
import { acccountAction, accountReducer, accountInitialState } from '../../store';

import './reset-password.scss';

export default function ForgotPassword() {
    const [isDone, setIsDone] = useState(false);
    const [state, dispatch] = useReducer(accountReducer, accountInitialState); 
    const [checker, setChecker] = useState(false);
    const {id} = useParams();
    const history = useHistory();

    const { SET_ACCOUNT_INFO, VALIDATE_ACCOUNT_INFO, SET_ACCOUNT_ERROR } = acccountAction;

    useEffect(() => {
        console.log(checker);
        if(checker){
            resetPassword({id, password: state.account.password}).then((status) => {
                console.log(status);
                setIsDone(true);
            }).catch((error) => {
                setIsDone(true);
                alert(error.message);
            })
        }
        
    }, [checker])

    const resetPasswordHandler = async() => {
        await dispatch({
            type: VALIDATE_ACCOUNT_INFO,
            payload: {
                value: ['password', 'password2']
            }
        })

        setChecker(checkError(state.error));
    }

    const changeHanlder = (e) => {
        const {value, name} = e.target;
        dispatch({
            type: SET_ACCOUNT_INFO,
            payload: {
                name: name,
                value:  value,
                validate: true
            }
        })
    }
    
    return (
        <div className='reset-password' style={{backgroundImage: 'url("/assets/couple-silhouette-evening-5k-2j-1920x1080.jpg")'}}>
            <header className='reset-password__header'>
                <Navbar 
                    mode={'dark'}
                    disableLogin={true}
                />
            </header>
            <div className='reset-password__main'>
                <div className='reset-password__main__form'>
                    <h2>reset password</h2>
                    <p>please enter your password to finish reseting your password</p>
                    <TextInput
                        name={'password'}
                        type={'password'}
                        disableStatus={!isDone ? false : true}
                        error={state.error['password']}
                        onChange={changeHanlder}
                    />
                    <TextInput
                        name={'password2'}
                        type={'password'}
                        disableStatus={!isDone ? false : true}
                        error={state.error['password2']}
                        onChange={changeHanlder}
                    />
                    {
                        !isDone ? <LoadingButton 
                                    placeholder={'reset password'}
                                    onClick={resetPasswordHandler}
                                 />
                               : <LoadingButton 
                                    placeholder={'to landing'}
                                    onClick={() => {history.push('/')}}
                                 />
                    }
                    
                </div>
            </div>
        </div>
    )
}