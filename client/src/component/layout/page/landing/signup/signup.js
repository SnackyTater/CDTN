import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from 'react-router';

import './signup.css';

export default function Login({isOpen, closeSignupForm}) {
    const [displayValidateForm, setdisplayValidate] = useState(false);
    const [email, setEmail] = useState('');
    const [serverValidationCode, setServerValidationCode] = useState('');
    const [inputValidationCode, setInputValidationCode] = useState('');
    const [showValidateError, setValidatError] = useState(false);

    const sendVerificationCodeToEmail=(e)=>{
        e.preventDefault();
        history.push('/signup', {mobile: 'taterazay98@gmail.com'});
        //getValidationCode(email)
    }

    const getValidationCode = (email) => {
        axios.post('https://cosmitto.herokuapp.com/api/account/emailVerificate', {email})
            .then((res) => {return res.data})
            .then((data) => {
                console.log(data);
                setServerValidationCode(data.code.toString());
                setdisplayValidate(true);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    let history = useHistory();

    const compareValidationCode = (e) => {
        e.preventDefault();
        if(serverValidationCode === inputValidationCode){
            history.push('/signup', {email});
        }
        else
            setValidatError(true);
    }

    if(!isOpen) return null
    return (
        <>
            <div className="overlay"/>
            <div className="signup-form">
                <button className="signup-form-close-button" onClick={closeSignupForm}>x</button>
                <div className="form-send-code-holder">
                    <input type="text" id="email" placeholder="email" onChange={(e) => {setEmail(e.target.value)}}/>
                    <button onClick={sendVerificationCodeToEmail}>Send code</button>
                </div>
                {
                    displayValidateForm &&
                        <div>
                            <p>verification code has been sent to your email, please check it, if you can't find it, it's probably in your spam or you have entered wrong email</p>
                            <div className="form-verify-code-holder">
                                <form>
                                    <input type="text" id="code" placeholder="validation code" onChange={(e) => {setInputValidationCode(e.target.value)}}/>
                                </form>
                                <button onClick={compareValidationCode}>validate code</button>
                            </div>
                            { showValidateError && <p>Wrong validation code</p>}
                        </div>
                }
            </div>
        </>
    )
}
