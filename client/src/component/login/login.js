import React, {useState} from 'react';
import axios from 'axios';

import './login.css';

export default function Login({isOpen, closeLoginForm}) {
    const [identityVerification, setIdentityVerification ] = useState('');
    const [password, setPassword] = useState('');

    const loginClickHandler = (e) => {
        e.preventDefault();
        setIdentityVerification(document.getElementById("username").value);
        setPassword(document.getElementById("password").value);
        loginHandler(identityVerification, password)
    }

    const loginHandler = async (identityVerification, password) => {
        try{
            const userInfo = await axios.post('https://cosmitto.herokuapp.com/api/account/login', {identityVerification, password})
            console.log(userInfo)
        } catch(err) {
            console.log(err)
        }
    }

    if(!isOpen) return null
    return (
        <>
            <div className="overlay"/>
            <div className="login-form">
                <button className="close-button" onClick={closeLoginForm}>x</button>
                <div className="form-holder">
                    <form>
                        <input type="text" id="username" placeholder="username/mobile number"/>
                        <br/>
                        <input type="text" id="password" placeholder="password"/>
                        <br/>
                        <a href="/">forgot password ?</a>
                        <br/>
                        <input type="submit" value="login" id="submit" onClick={loginClickHandler}/>
                    </form>
                    
                </div>
                <div className="form-holder-2">
                    <button>login with google</button>
                </div>
            </div>
        </>
    )
}
