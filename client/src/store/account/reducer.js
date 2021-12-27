import _ from 'lodash/fp';
import { SET_ACCOUNT, SET_ACCOUNT_INFO, VALIDATE_ACCOUNT_INFO, SET_ACCOUNT_ERROR } from './action';
import { checkEmail, checkPassword, checkPasswordMatch, checkUsername, checkMobileNumber } from '../../utils/utils';


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
        case 'mobile':
            checker = checkMobileNumber(value);
            break;
        case 'password':
            checker = checkPassword(value);
            // if(state.account?.password2?.length !== 0){
            //     checker = checkPasswordMatch(value, state.account.password2);
            //     field = 'password2';
            // }         
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

export const reducer = (state, action) => {
    const { type, payload } = action;
    let stateHolder = state;
    switch(type){
        case SET_ACCOUNT: {
            stateHolder = _.set(`account`, payload, stateHolder);
            break;
        }
        case SET_ACCOUNT_INFO: {
            if(payload.validate){
                console.log()
                stateHolder = _.set(`error.${payload.name}`, validateField(state, payload.name, payload.value), stateHolder);
            }
            stateHolder = _.set(`account.${payload.name}`, payload.value, stateHolder);
            break;
        }
        case SET_ACCOUNT_ERROR: {
            stateHolder = _.set(`error.${payload.name}`, {status: false, message: payload.value}, stateHolder);
            break;
        }
        case VALIDATE_ACCOUNT_INFO:{
            let error = {};
            payload.value.forEach((field) => {
                error = _.set(field, validateField(state, field, state.account[field]), error);
            })
            stateHolder = _.set(`error`, error, stateHolder);

            break;
        }
        default: {
            return stateHolder;
        }
    }
    console.log(stateHolder);
    return stateHolder;
}