import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

import './signupForm.css';

//import component
import TextInput from '../../../common/component/input/text/input';
import Overlay from '../../../common/component/overlay/overlay';

//import hooks
import Account from '../../../common/hooks/accountInfo/account';

//import utils
import {checkEmail} from '../../../utils/utils';

export default function Login({isOpen, closeSignupForm}) {
    const {account, error, SetAccount, SetError} = Account();

    const [displayValidateForm, setDisplayValidateForm] = useState(false);
    const [validateError, setValidateError] = useState({status: false, message: ''});
    const [validateCode, setValidateCode] = useState({fromServer: '', fromUser: ''});

    let history = useHistory();

    const changeHandler = (e) => {
        let {status, message} = checkEmail(e.target.value);
        SetError('email', !status, message);
        SetAccount(e, true);
    }

    const validateFormHandler = (e) => {
        e.preventDefault();
        let {value} = e.target;
        setValidateCode({...validateCode, fromUser: value});
    }

    const sendVerificationCodeToEmail= async(e)=>{
        e.preventDefault();
        try{
            const result = await axios.post('http://localhost:5000/account/email-verificate', {email: account.email});
            const validationCode = result.data.code;

            setValidateCode({...validateCode, fromServer: validationCode});
            setDisplayValidateForm(true);
        } catch(err) {
            let message = err?.response?.data;
            console.log(message)
            message && SetError('email', false, message);
            console.log('aa')
        }
    }

    const verifyCode = () => {
        if(validateCode.fromServer === validateCode.fromUser){
            console.log('blin')
            setValidateError({status: false, message: ''});
            history.push('/signup', {email: account.email});
        } else {
            console.log('not blin')
            setValidateError({status: false, message: 'validate code does not match'});
        }
    }

    if(!isOpen) return null
    return (
        <>
            <Overlay/>
            <div className="form-signup">
                <button className="form-signup__close-button" onClick={closeSignupForm}>x</button>
                {
                    displayValidateForm 
                    ?   <div>
                            <TextInput name="validate" type="text" placeholder={"validation code"} disableStatus={false} onChange={validateFormHandler} error={validateError}/>
                            <button className="form-signup__button" onClick={verifyCode}>Validate</button>
                        </div> 
                    :   <div className="form-signup__holder">
                            <TextInput name="email" type="text" placeholder={"email"} disableStatus={false} onChange={changeHandler} error={error.email}/>
                            <button className="form-signup__button" onClick={sendVerificationCodeToEmail}>Send code</button>
                        </div> 
                }
            </div>
        </>
    )
}

