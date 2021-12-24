import _ from 'lodash/fp';
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
            stateHolder = payload.value;
            break;
        }
        case SET_USER_INFO: {
            if(payload.validate){
                stateHolder = _.set(`error.${payload.name}`, validateField(payload.name, payload.value), stateHolder);
            }
            stateHolder = _.set(`user.info.${payload.name}`, payload.value, stateHolder);
            break;
        }
        case SET_USER_CONFIG: {
            stateHolder = _.set(`user.config.${payload.name}`, payload.value, stateHolder);
            break;
        }
        case SET_USER_IMAGE: {
            let imageList = stateHolder?.user?.info?.profileImage;
            const imageIndex = imageList.findIndex((image) => image.imagePublicID === payload.value.imagePublicID);

            if(imageIndex === -1) imageList.push(payload.value);
            else imageList.splice(imageIndex, 1);

            stateHolder = _.set('user.info.profileImage', imageList, stateHolder);

            break;
        }
        case SET_USER_PASSION: {
            let passionsList = stateHolder?.user?.info?.passions;
            let checkPassionIndex = passionsList?.indexOf(action.payload.value);
    
            //if passion not exist in info push in
            if(checkPassionIndex === -1) passionsList.push(action.payload.value);
            //if exist splice it out
            else passionsList.splice(checkPassionIndex, 1);

            stateHolder = _.set('user.info.passions', passionsList, stateHolder);

            break;
        }
        default: 
            return state;
    }
    console.log(stateHolder)
    return stateHolder;
}