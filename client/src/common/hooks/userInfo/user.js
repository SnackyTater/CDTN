import {useState, useEffect} from 'react';
import {checkFullName, checkDOB} from '../../../utils/utils';

const User = () => {
    const [user, setUser] = useState({
        token: '',
        userInfo: {
            fullName: '',
            DateOfBirth: '',
            gender: '',
            description: '',
            passions: [],
            profileImage:[]
        }
    })

    const [error, setError] = useState({
        fullName: {status: true, message: ''},
        DateOfBirth: {status: true, message: ''},
        gender: {status: true, message: ''},
        passions: {status: true, message: ''},
        profileImage: {status: true, message: ''},
    })

    useEffect(()=> {
        console.log('user useEffect error:',error);
        console.log(user);
    },[user, error]);

    //set user info
    const setToken = (token) => {
        setUser({...user, token});
    }

    const SetUser = (e, validate) => {
        let {name, value} = e.target;
        console.log(name, value)
        validate && validateField(name, value);
        setUser({...user, userInfo:{...user.userInfo, [name]: value}});
    }

    const SetPassions = (id) => {

        let passionsList = user.userInfo.passions;
        let checkPassionIndex = passionsList.indexOf(id);

        //if passion not exist in userInfo push in
        if(checkPassionIndex === -1) passionsList.push(id);
        //if exist splice it out
        else passionsList.splice(checkPassionIndex, 1);

        setUser({...user, userInfo:{...user.userInfo, passions: passionsList}});
    }

    const SetImage = ({public_id, secure_url}) => {
        console.log('a')
        let imageList = user.userInfo.profileImage;
        const imageIndex = imageList.findIndex((image) => image.imagePublicID === public_id);

        if(imageIndex === -1) imageList.push({
            imagePublicID: public_id,
            imageURL: secure_url
        })
        else imageList.splice(imageIndex, 1);

        setUser({...user, userInfo:{...user.userInfo, profileImage: imageList}});
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
        const {fullName, DateOfBirth, gender, passions, profileImage} = user.userInfo;
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

    return {user, error, setToken, SetUser, SetPassions, SetError, SetImage,userSubmitHandler};
}

export default User;