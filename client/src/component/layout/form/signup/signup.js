import axios from 'axios';
import {useState} from 'react';
import { useHistory } from 'react-router';

import './signupForm.css';
import Input from '../../../common/input/input';
import Account from '../../../../common/user/accountInfo/account';
import {checkEmail} from '../../../../common/utils/utils';

export default function Login({isOpen, closeSignupForm}) {
    const {account, error, SetAccount, SetError} = Account();

    const [displayValidateForm, setDisplayValidateForm] = useState(false);
    const [validateError, setValidateError] = useState({status: false, message: ''});
    const [validateCode, setValidateCode] = useState({fromServer: '', fromUser: ''});

    let history = useHistory();

    const changeHandler = (e) => {
        let {status, message} = checkEmail(e.target.value);
        SetError('email', !status, message);
        SetAccount(e);
    }

    const validateFormHandler = (e) => {
        e.preventDefault();
        let {value} = e.target;
        setValidateCode({...validateCode, fromUser: value});
    }

    const sendVerificationCodeToEmail=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/account/emailVerificate', {email: account.email})
            .then((res) => {
                setValidateCode({...validateCode, fromServer: res.data.code});
                console.log(validateCode)
                setDisplayValidateForm(true);
            })
            .catch((error) => {
                let message = error?.response?.data?.message;
                message && SetError('email', true, message);
            })
    }

    const verifyCode = () => {
        if(validateCode.fromServer == validateCode.fromUser){
            console.log('blin')
            setValidateError({status: false, message: ''});
            history.push('/signup', {email: account.email});
        } else {
            console.log('not blin')
            setValidateError({status: true, message: 'validate code does not match'});
        }
    }

    if(!isOpen) return null
    return (
        <>
            <div className="overlay"/>
            <div className="form-signup">
                <button className="form-signup__close-button" onClick={closeSignupForm}>x</button>
                <div className="form-signup__holder">
                    <Input name="email" type="text" placeholder={"email"} disableStatus={false} onChange={changeHandler} error={error.email}/>
                    <button className="form-signup__button" onClick={sendVerificationCodeToEmail}>Send code</button>
                </div>
                {
                    displayValidateForm && 
                        <div>
                            <Input name="validate" type="text" placeholder={"validation code"} disableStatus={false} onChange={validateFormHandler} error={validateError}/>
                            <button className="form-signup__button" onClick={verifyCode}>Validate</button>
                        </div>
                }
            </div>
        </>
    )
}

