import {useState, useEffect} from 'react';
import {checkUsername, checkPassword, checkEmail, checkPasswordMatch, checkMobileNumber} from '../../../utils/utils';

const Account = () => {
    const [account, setAccount] = useState({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        password2: ''
    })

    const [error, setError] = useState({
        username: {status: true, message: ''},
        email: {status: true, message: ''},
        mobileNumber: {status: true, message: ''},
        password: {status: true, message: ''},
        password2: {status: true, message: ''}
    })

    useEffect(() => {
        console.log(error)
    }, [account, error])

    //set account (if want validate when typing pass true, else false)
    const SetAccount = (event, validate) => {
        const {name, value} = event.target;
        validate && checkFieldValid(name, value);  
        setAccount({...account, [name]: value});
    }

    const SetError = (field, status, message) => {
        setError({...error, [field]: {status, message}});
    }

    //check if input value in field is valid (this one check when user type in field)
    const checkFieldValid = (field, value) => {
        let checker = {};
        switch(field){
            case 'username': 
                checker = checkUsername(value);
                break;
            case 'email': 
                checker = checkEmail(value);
                break;
            case 'password':
                checker = checkPassword(value);
                if(account.password2.length !== 0){
                    checker = checkPasswordMatch(value, account.password2);
                    field = 'password2';
                }         
                break;
            case 'password2': 
                checker = checkPasswordMatch(account.password, value);
                break;
            default:
                checker = {status: true, message: ''};
                break;
        }
        let {status, message} = checker;
        SetError(field, status, message);
    }

    //check every field in account before submit (if something is wrong it will return false else return true)
    const accountSubmitChecker = () => {
        const {username, email, mobileNumber, password, password2} = account
        let accountError = {}
        accountError.username = checkUsername(username);
        accountError.email = checkEmail(email);
        accountError.mobileNumber = checkMobileNumber(mobileNumber);
        accountError.password = checkPassword(password);
        accountError.password2 = checkPasswordMatch(password, password2);

        setError({...error, ...accountError});

        let checker = [accountError.username.status, accountError.email.status, accountError.mobileNumber.status, accountError.password.status, accountError.password2.status];
        if(checker.includes(false)) return false;
        return true;
    }

    return {account, error, SetAccount, setAccount, SetError, setError, accountSubmitChecker}
}

export default Account;