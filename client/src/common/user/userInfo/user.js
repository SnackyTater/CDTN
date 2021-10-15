import {useState, useEffect} from 'react';
import {checkFullName, checkDOB} from '../../utils/utils';

const User = () => {
    const [user, setUser] = useState({
        token: '',
        userInfo: {
            fullName: '',
            DateOfBirth: '',
            gender: 'unknown',
            description: '',
            passions: []
        }
    })

    const [error, setError] = useState({
        fullName: {status: true, message: ''},
        DateOfBirth: {status: true, message: ''},
        gender: {status: true, message: ''},
        passions: {status: true, message: ''},
    })

    useEffect(()=> {
        // console.log('user useEffect error:',error);
        // console.log(user);
    },[user, error]);

    //set user info
    const setToken = (token) => {
        setUser({...user, token});
    }

    const SetUser = (e, validate) => {
        let {name, value} = e.target;
        validate && validateField(name, value);
        setUser({...user, userInfo:{...user.userInfo, [name]: value}});
    }

    const SetPassions = (e) => {
        const {value} = e.target;

        let passionsList = user.userInfo.passions;
        let checkPassionIndex = passionsList.indexOf(value);

        //if passion not exist in userInfo push in
        if(checkPassionIndex === -1) passionsList.push(value);
        //if exist splice it out
        else passionsList.splice(checkPassionIndex, 1);

        setUser({...user, userInfo:{...user.userInfo, passions: passionsList}});
    }

    //set error
    const SetError = (field, status, message) => {
        setError({...error, [field]: {status, message}});
    }

    //validate field when typing
    const validateField = (field, value) => {
        let checker = {}
        switch(field){
            case 'fullName':
                checker = checkFullName(value);
                break;
            case 'DateOfBirth':
                console.log(value);
                checker = checkDOB(value);
                break;
            default:
                checker = {status: true, message: ''}
                break;
        }
        let {status, message} = checker;
        SetError(field, status, message);
    }

    //validate field before submit;
    const userSubmitHandler = () => {
        const {fullName, DateOfBirth, gender} = user.userInfo;
        let userError = {};
        userError.fullName = checkFullName(fullName);
        userError.DateOfBirth = checkDOB(DateOfBirth);
        userError.gender = (gender === '') ? ({status: false, message: 'must pick a gender'}) : ({status: true, message: ''});

        setError({...error, ...userError});

        const errorHolder = [userError.fullName.status, userError.DateOfBirth.status, userError.gender.status];
        if(errorHolder.includes(false)) return false;
        return true;
    }

    return {user, error, setToken, SetUser, SetPassions, SetError, userSubmitHandler};
}

export default User;