import {useState} from 'react';
import {checkFullName, checkDOB} from '../../../utils/utils';

const User = () => {
    const [user, setUser] = useState({
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
                    type: "Point",
                    coordinates: [0, 0]
                },
                gender: 'others',
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
    })

    const [error, setError] = useState({
        fullName: {status: true, message: ''},
        DateOfBirth: {status: true, message: ''},
        gender: {status: true, message: ''},
        passions: {status: true, message: ''},
        profileImage: {status: true, message: ''},
    })

    const SetUser = (e, validate) => {
        let {name, value} = e.target;
        console.log(name, value)
        validate && validateField(name, value);
        setUser({...user, info:{...user.info, [name]: value}});
    }

    const SetPassions = (id) => {
        let passionsList = user?.info?.passions;
        let checkPassionIndex = passionsList?.indexOf(id);

        //if passion not exist in info push in
        if(checkPassionIndex === -1) passionsList.push(id);
        //if exist splice it out
        else passionsList.splice(checkPassionIndex, 1);

        setUser({...user, info:{...user.info, passions: passionsList}});
    }

    const SetImage = ({public_id, secure_url}) => {
        console.log('a')
        let imageList = user.info.profileImage;
        const imageIndex = imageList.findIndex((image) => image.imagePublicID === public_id);

        if(imageIndex === -1) imageList.push({
            imagePublicID: public_id,
            imageURL: secure_url
        })
        else imageList.splice(imageIndex, 1);

        setUser({...user, info:{...user.info, profileImage: imageList}});
    }

    const setRange = (e) => {
        const {value} = e.target;

        setUser({...user, matchMaking: {config: {...user?.matchMaking?.config, zoneLimit: {...user?.matchMaking?.config?.zoneLimit, diameter: value*10000}}}});
    }

    const toggleRange = (e) => {
        const {checked} = e.target;
        console.log(checked);
        setUser({...user, matchMaking: {config: {...user?.matchMaking?.config, zoneLimit: {...user?.matchMaking?.config?.zoneLimit, isOn: checked}}}});
    }

    const setMatchMakingGender = value => {
        setUser({...user, matchMaking: {config: {...user?.matchMaking?.config, gender: value}}});
    }

    const setMatchMakingAge = inputAge => {
        setUser({...user, matchMaking: {config: {...user?.matchMaking?.config, age: {from: inputAge[0], to: inputAge[1]}}}});
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
        const {fullName, DateOfBirth, gender, passions, profileImage} = user.info;
        let userError = {};
        userError.fullName = checkFullName(fullName);
        userError.DateOfBirth = checkDOB(DateOfBirth);
        userError.gender = (gender === '') ? ({status: false, message: 'must pick a gender'}) : ({status: true, message: ''});
        userError.passions = (passions.length === 0) ? ({status: false, message: 'please pick a passion'}) : ({status: true, message: ''});
        userError.profileImage = (profileImage.length === 0) ? ({status: false, message: 'please pick a avatar'}) : ({status: true, message: ''});

        setError({...error, ...userError});

        const errorHolder = [userError.fullName.status, userError.DateOfBirth.status, userError.gender.status];
        if(errorHolder.includes(false)) return false;
        return true;
    }

    return {user, error, SetUser, setUser, SetPassions, setRange, setMatchMakingGender, setMatchMakingAge, toggleRange, SetError, SetImage,userSubmitHandler};
}

export default User;