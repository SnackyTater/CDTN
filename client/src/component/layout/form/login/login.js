import React from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

import Input from '../../../common/input/input';
import './login.css';

import Account from '../../../../common/user/accountInfo/account';
import User from '../../../../common/user/userInfo/user'

export default function Login({isOpen, closeLoginForm}) {
    const {account, error: accountError, SetAccount, SetError, setError} = Account();
    const {setToken} = User();
    const history = useHistory();
    
    const changeHandler = (e) => {
        SetAccount(e);
    }
    
    const loginHandler = async (e) => {
        e.preventDefault();
        let {username: identityVerification, password} = account;

        if(identityVerification.length === 0) SetError('username', true, 'must enter a username');
        if(password.length === 0) SetError('password', true, 'must enter password');
        
        if(identityVerification.length > 0 && password.length > 0){

            axios.post('http://localhost:5000/api/account/login', {identityVerification, password})
                .then((res) => {
                    setToken(res.data);
                    history.push('/home', {token: res.data});
                }).catch((error) => {
                    let message = error?.response?.data;
                    if(message?.includes("username")){
                        setError({...accountError, username: {status: true, message: 'wrong username'}, password: {status: false, message: ''}});
                    }
                    if(message?.includes("password")){
                        setError({...accountError, username: {status: false, message: ''}, password: {status: true, message: 'wrong password'}});
                    }
                    console.log(error);
                })
        }
        
    }

    if(!isOpen) return null
    return (
        <>
            <div className="overlay"/>
            <div className="login-form">
                <button className="login-form-close-button" onClick={closeLoginForm}>x</button>
                <div className="login-form-holder">
                    <form>
                        <Input name="username" type="text" placeholder={"username"} disableStatus={false} onChange={changeHandler} error={accountError.username}/>
                        <Input name="password" type="password" placeholder={"password"} disableStatus={false} onChange={changeHandler} error={accountError.password}/>
                    </form>
                    <Link to="/forgot-password" className="forgot-password">forgot password ?</Link>
                    <br/>
                    <button className="login-button" onClick={loginHandler}>login</button>
                </div>      
            </div>
        </>
    )
}
