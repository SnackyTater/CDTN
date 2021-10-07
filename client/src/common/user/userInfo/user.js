import {useState} from 'react';
import {checkUsername, checkPassword, checkEmail} from '../../utils/utils'

export default account = () => {
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

    const SetAccount = (field, value) => {
        checkFieldValid(field, value)
        setAccount({...account, [field]: value});
    }

    const SetError = (field, status, message) => {
        setError({...error, [field]: {...error[field], status, message}})
    }

    const checkFieldValid = (field, value) => {
        if(field == 'username'){
            let {status, message} = checkUsername(value);
            if(!status) setError(username, status, message);
        }
        if(field == 'email'){
            let {status, message} = checkEmail(value);
            if(!status) setError(email, status, message);
        }
        if(field == 'password'){
            let {status, message} = checkPassword(value);
            if(!status) setError(password, status, message);
        }
    }

    const checkPasswordMatch = () => {
        if(account.password !== account.password2) setError(password2, false, 'password does not match');
    }

    return {account, SetAccount, SetError, checkPasswordMatch}
}