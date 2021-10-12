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

    const errorInit = () => {
        setError({
            username: {status: false, message: ''},
            email: {status: false, message: ''},
            mobileNumber: {status: false, message: ''},
            password: {status: false, message: ''},
            password2: {status: false, message: ''}
        })
    }

    // useEffect(() => {
    //     console.log('useEffect log');
    //     console.log(account);
    //     console.log(error);
    // }, [account, error])

    const SetAccount = (event, validate) => {
        const {name, value} = event.target;
        validate && checkFieldValid(name, value);
        setAccount({...account, [name]: value});
    }

    const SetError = (field, status, message) => {
        setError({...error, [field]: {status, message}});
    }

    const checkFieldValid = (field, value) => {
        console.log('aaaaa');
        let checker;
        if(field === 'username') checker = checkUsername(value);
        if(field === 'email') checker = checkEmail(value);
        if(field === 'password') checker = checkPassword(value);

        let {status, message} = checker;
        console.log(checker);
        if(!status) SetError(field, !status, message);
    }

    const checkPasswordMatch = () => {
        if(account.password !== account.password2) setError('password2', false, 'password does not match');
    }

    return {account, error, SetAccount, errorInit, SetError, setError, checkPasswordMatch}
}

export default Account;