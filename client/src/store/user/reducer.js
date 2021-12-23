import _ from 'lodash';
import { SET_USER_INFO, SET_USER_CONFIG, SET_USER_IMAGE, SET_USER_PASSION, SET_USER } from './action';
import { checkDOB, checkFullName, checkPassions } from '../../utils/utils';


export const initialState = {
    error: {
        fullName: {
            status: true, 
            message: ''
        },
        DateOfBirth: {
            status: true, 
            message: ''
        },
        gender: {
            status: true, 
            message: ''
        },
        passions: {
            status: true, 
            message: ''
        },
        profileImage: {
            status: true, 
            message: ''
        },
    },
    user:{
        info: {
            fullName: '',
            DateOfBirth: '',
            gender: '',
            description: '',
            passions: [],
            profileImage:[]
        },
        config: {
            coordinates: [0, 0],
            gender: 'others',
            ageFrom: 18,
            ageTo: 32,
            diameter: 80000,
            diameterStatus: false,
        }
    }
}

const validateField = (name, value) => {
    switch(name){
        case 'fullName': 
            return checkFullName(value);
        case 'DateOfBirth': 
            return checkDOB(value);
        default: 
            return {status: true, message: ''}
}}


export const reducer = (state, action) => {
    const { type, payload } = action;
    let stateHolder = state;
    switch(type){
        case SET_USER: {
            stateHolder = payload
            break;
        }
        case SET_USER_INFO: {
            if(payload.validate){
                _.set(stateHolder, `error.${payload.name}`, validateField(payload.name, payload.value));
            }
            _.set(stateHolder, `user.info.${payload.name}`, payload.value);
            break;
        }
        case SET_USER_CONFIG: {
            _.set(stateHolder, `user.config.${payload.name}`, payload.value);
            break;
        }
        case SET_USER_IMAGE: {
            break;
        }
        case SET_USER_PASSION: {
            const userPassions = stateHolder.user.info.passions;
            const passionIndex = _.findIndex(userPassions, action.payload);
            console.log(passionIndex);
            console.log(!passionIndex);
            if(!passionIndex) userPassions.splice(passionIndex, 1);
            else  userPassions.push(action.payload);
            _.set(stateHolder, 'user.info.passions', userPassions);

            break;
        }
    }
    console.log(stateHolder);
    return stateHolder;
}