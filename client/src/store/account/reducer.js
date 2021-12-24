import _ from 'lodash/fp';
import { SET_ACCOUNT, SET_ACCOUNT_INFO, VALIDATE_ACCOUNT_INFO } from './action';
import { checkEmail, checkPassword, checkPasswordMatch, checkUsername } from '../../utils/utils';


export const initialState = {
    error: {
        username: {status: true, message: ''},
        email: {status: true, message: ''},
        mobile: {status: true, message: ''},
        password: {status: true, message: ''},
        password2: {status: true, message: ''}
    },
    account:{
        username: '',
        email: '',
        mobile: '',
        password: '',
        password2: ''
    }
}

const validateField = (state, field, value) => {
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
            if(state.account?.password2?.length !== 0){
                checker = checkPasswordMatch(value, state.account.password2);
                field = 'password2';
            }         
            break;
        case 'password2': 
            checker = checkPasswordMatch(state.account.password, value);
            break;
        default:
            checker = {status: true, message: ''};
            break;
    }
    return checker;
}

const validateAccount = (state, fieldArray) => {
    let error = {}
    fieldArray.map((field) => {
        error = {...error, [field]: validateField(field, state[field])}
    })
    return error;
}


export const reducer = (state, action) => {
    const { type, payload } = action;
    let stateHolder = state;
    switch(type){
        case SET_ACCOUNT: {
            stateHolder = payload.value;
            break;
        }
        case SET_ACCOUNT_INFO: {
            if(payload.validate){
                stateHolder = _.set(`error.${payload.name}`, validateField(payload.name, payload.value), stateHolder);
            }
            stateHolder = _.set(`account.${payload.name}`, payload.value, stateHolder);
            break;
        }
        case VALIDATE_ACCOUNT_INFO:{
            const error = validateAccount(state, payload.value);

            stateHolder = _.set('error', error, stateHolder);
            break;
        }
        default: {
            return stateHolder;
        }
    }
    console.log(stateHolder)
    return stateHolder;
}