import React, {useState} from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

import Input from '../../../common/input/input';
import './login.css';

import Account from '../../../../common/user/accountInfo/account';

export default function Login({isOpen, closeLoginForm}) {
    const {account, error, SetAccount, SetError} = Account();
    const history = useHistory();
    
    const changeHandler = (e) => {
        SetAccount(e, false);
    }
    
    const loginHandler = (e) => {
        let {username: identityVerification, password} = account;

        axios.post('http://localhost:5000/api/account/login', {identityVerification, password})
            .then((res) => {return res.data})
            .then((data) => {
                history.push('/profile');
            })
            .catch((error) => {
                let {message} = error.response.data;
                if(message.includes("username")) SetError('username', false, 'wrong username');
                if(message.includes("password")) SetError('password', false, 'wrong password');
            })
    }

    if(!isOpen) return null
    return (
        <>
            <div className="overlay"/>
                <div className="login-form">
                    <button className="login-form-close-button" onClick={closeLoginForm}>x</button>
                    <div className="login-form-holder">
                        <form>
                            <Input name="username" type="text" placeholder={"username"} disableStatus={false} onChange={changeHandler} error={error.username}/>
                            <Input name="password" type="password" placeholder={"password"} disableStatus={false} onChange={changeHandler} error={error.password}/>
                        </form>
                        <Link to="/forgot-password" className="forgot-password">forgot password ?</Link>
                        <br/>
                        <button className="login-button" onClick={loginHandler}>login</button>
                    </div>
                    <div className="login-form-holder-google">
                        <p>OR</p>
                        <button>login with google</button>
                </div>
            </div>
        </>
    )
}
