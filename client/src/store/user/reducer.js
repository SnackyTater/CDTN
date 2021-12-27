import _ from 'lodash/fp';
import { SET_USER_INFO, SET_USER_CONFIG, SET_USER_IMAGE, SET_USER_PASSION, SET_USER, VALIDATE_USER_INFO } from './action';
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
        matchMaking: {
            config: {
                location: {
                    coordinates: [0,0]
                },
                gender: '',
                age: {
                    from: 18,
                    to: 32
                },
                zoneLimit:{
                    diameter: 80000,
                    isOn: true
                }
            }
        }
    }
}

const validateField = (name, value) => {
    let checker = {status: true, message: ''}
    switch(name){
        case 'fullName':{
            checker = checkFullName(value);
            break;
        }
        case 'DateOfBirth': {
            checker = checkDOB(value);
            break;
        }
        case 'gender': {
            if(value === '')
            checker={status: false, message: 'must pick one'}
            break;
        }
        case 'interestIn': {
            if(!value)
            checker={status: false, message: 'must pick one'}
            break;
        }
        case 'profileImage': {
            if(value.length === 0)
            checker={status: false, message: 'must add atleast one image'}
            break;
        }
        case 'passions': {
            if(value.length < 3)
            checker={status: false, message: 'must add atleast three passion'}
            if(value.length > 5)
            checker={status: false, message: 'must not add more than five passion'}
            break;
        }
        default: {}
    }
    return checker
}

const configPath = (name) => {
    switch(name){
        case 'coordinates': return 'location.coordinates'
        case 'gender': return 'gender'
        case 'diameter': return 'zoneLimit.diameter'
        case 'disableDiameter': return 'zoneLimit.isOn'
        case 'age': return 'age'
    }
}


export const reducer = (state, action) => {
    const { type, payload } = action;
    let stateHolder = state;
    switch(type){
        case SET_USER: {
            stateHolder = _.set('user', payload, stateHolder);
            break;
        }
        case SET_USER_INFO: {
            console.log('set info')
            if(payload.validate){
                stateHolder = _.set(`error.${payload.name}`, validateField(payload.name, payload.value), stateHolder);
            }
            stateHolder = _.set(`user.info.${payload.name}`, payload.value, stateHolder);
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
        case VALIDATE_USER_INFO: {
            let error = {};
            payload.value.forEach((field) => {
                
                error = _.set(field, validateField(field, state.user.info[field]), error);
            })
            stateHolder = _.set(`error`, error, stateHolder);
            break;
        }
        case SET_USER_CONFIG: {
            if(payload.name === 'age'){
                payload.value = {
                    from: payload.value[0],
                    to: payload.value[1],
                }
            }
            stateHolder = _.set(`user.matchMaking.config.${configPath(payload.name)}`, payload.value, stateHolder);
            break;
        }
        default: 
            return state;
    }
    console.log(stateHolder);
    return stateHolder;
}