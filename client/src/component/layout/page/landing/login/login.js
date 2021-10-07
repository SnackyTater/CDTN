import React, {useState} from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

import Input from '../../../../common/input/input';
import './login.css';

export default function Login({isOpen, closeLoginForm}) {
    const [identityVerification, setIdentityVerification ] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [displayError, setDisplayError] = useState(false);

    const loginClickHandler = (e) => {
        e.preventDefault();
        loginHandler(identityVerification, password)
    }

    const history = useHistory();

    const loginHandler = (identityVerification, password) => {
        axios.post('http://localhost:5000/api/account/login', {identityVerification, password})
            .then((res) => {return res.data})
            .then((data) => {
                history.push('/profile');
            })
            .catch((error) => {
                setDisplayError(true);
                setError(error.response.data);
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
                            <Input name="username" type="text" placeholder={"username"} disableStatus={false} onChange={(e) => {setIdentityVerification(e.target.value)}} error={error.username}/>
                            <Input name="password" type="password" placeholder={"password"} disableStatus={false} onChange={(e) => {setPassword(e.target.value)}} error={error.username}/>
                        </form>
                        <Link to="/forgot-password" className="forgot-password">forgot password ?</Link>
                        <br/>
                        <button className="login-button" onClick={loginClickHandler}>login</button>
                    </div>
                    <div className="login-form-holder-google">
                        <p>OR</p>
                        <button>login with google</button>
                </div>
            </div>
        </>
    )
}
