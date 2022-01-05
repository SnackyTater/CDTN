import { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LoadingBackdrop, Navbar } from '../../component';
import { userInitialState, userReducer, accountInitialState, accountReducer, userAction, acccountAction } from '../../store';
import { createAccount } from '../../api/common/account';
import { checkError } from '../../utils/utils';

//css
import './signup.scss';

import UserForm from './component/main/form/user/user';
import AccountForm from './component/main/form/account/account';

import {LoadingButton} from '../../component';

export default function Signup(){
    const [isLoading, setLoading] = useState(true);
    const [checker, setChekcer] = useState([]);
    const [cookies, setCookie] = useCookies('jwt');
    const [userState, userDispatch] = useReducer(userReducer, userInitialState);
    const [accountState, accountDispatch] = useReducer(accountReducer, accountInitialState);
    const {VALIDATE_ACCOUNT_INFO, SET_ACCOUNT_ERROR} = acccountAction;
    const {VALIDATE_USER_INFO} = userAction;
    const history = useHistory();

    const handleCreateAccount = async(e) => {
        await accountDispatch({
            type: VALIDATE_ACCOUNT_INFO,
            payload: {
                value: ['username', 'mobile', 'email', 'password']
            }
        })

        await userDispatch({
            type: VALIDATE_USER_INFO,
            payload: {
                value: ['fullName', 'gender', 'interestIn', 'passions', 'DateOfBirth', 'profileImage']
            }
        })

        const accountChecker = checkError(accountState.error);
        const userChekcer = checkError(userState.error);
        await setChekcer([accountChecker, userChekcer]);
        console.log('checker',accountChecker, userChekcer)
        console.log(checker)
        if(checker[0] && checker[1]){
            try{
                setLoading(true);
                const {access_token} = await createAccount({
                    accountInfo: accountState.account,
                    userInfo: userState.user.info
                })
                setCookie('jwt', access_token);
                history.push('/home');
            }catch(err) {
                setLoading(false);
                const {message} = err;
                let name = '';
                if(message.includes('username')) name = 'username';
                if(message.includes('email')) name = 'email';
                if(message.includes('mobile')) name = 'mobile';

                accountDispatch({
                    type: SET_ACCOUNT_ERROR,
                    payload: {
                        name: name,
                        value: `${name} has been used`
                    }
                })
            }
        }
    }

    return (
        <>
            {isLoading && <LoadingBackdrop/>}
            <div className='signup'>
            <header className='signup__header'>
                <Navbar 
                    mode={'light'}
                    disableLogin={true}
                />
            </header>
            <div className='signup__content'>
                <UserForm
                    state={userState}
                    dispatch={userDispatch}
                    setLoading={(status) => {setLoading(status)}}
                />
                <hr style={{margin: '5px 0px', color: 'rgba(0,0,0,0.3)'}}/>
                <AccountForm
                    state={accountState}
                    dispatch={accountDispatch}
                />
                <div className='signup__content__button'>
                    <LoadingButton 
                        placeholder={'sign up'}
                        onClick={handleCreateAccount}
                    />
                </div>
            </div>
        </div>
        </>
        
    )
}