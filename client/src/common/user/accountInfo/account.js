import {useState} from 'react';
import {checkUsername, checkPassword, checkEmail} from '../../utils/utils';

const Account = () => {
    const [account, setAccount] = useState({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        password2: ''
    })

    const [error, setError] = useState({
        username: {status: false, message: ''},
        email: {status: false, message: ''},
        mobileNumber: {status: false, message: ''},
        password: {status: false, message: ''},
        password2: {status: false, message: ''}
    })

    const SetAccount = (event, validate) => {
        const {name, value} = event.target;
        if(validate) checkFieldValid(name, value);
        setAccount({...account, [name]: value});
    }

    const SetError = (field, status, message) => {
        console.log(field, status, message)
        setError({...error, [field]: {status: !status, message}})
        console.log(error)
    }

    const checkFieldValid = (field, value) => {
        if(field === 'username'){
            let {status, message} = checkUsername(value);
            if(!status) SetError(field, status, message);
        }
        if(field === 'email'){
            let {status, message} = checkEmail(value);
            if(!status) SetError('email', status, message);
        }
        if(field === 'password'){
            let {status, message} = checkPassword(value);
            if(!status) SetError('password', status, message);
        }
    }

    const checkPasswordMatch = () => {
        if(account.password !== account.password2) setError('password2', false, 'password does not match');
    }

    return {account, error, SetAccount, SetError, checkPasswordMatch}
}

export default Account;