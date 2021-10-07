import {useState} from 'react';

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
    })

    const SetAccount = (field, value) => {
        setAccount({...account, [field]: value});
    }

    const SetError = (field, status, message) => {
        setError({...error, [field]: {...error[field], status, message}})
    }

    return {account, SetAccount, SetError}
}