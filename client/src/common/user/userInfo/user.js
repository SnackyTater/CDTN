import {useState} from 'react';
import {} from '../../utils/utils';

const User = () => {
    const [user, setUser] = useState({
        token: '',
        userInfo: {
            fullName: '',
            DateOfBirth: '',
            gender: '',
            description: '',
            passions: [],
            relationship: '',
        }
    })

    const [error, setError] = useState({
        fullName: {status: false, message: ''},
        DateOfBirth: {status: false, message: ''},
        gender: {status: false, message: ''},
        passions: {status: false, message: ''},
    })

    const setToken = (token) => {
        setUser({...user, token});
    }

    const SetUser = (e, validate) => {
        let {name, value} = e.target;
        validate && validateField(name);
        setUser({...user, userInfo:{...user.userInfo, [name]: value}});
    }

    const validateField = (field) => {
        
    }

    const SetError = (field, status, message) => {
        setError({...error, [field]: {status, message}});
    }

    return {user, error, setToken, SetUser, SetError};
}

export default User;