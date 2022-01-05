import {useState, useEffect, useReducer} from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

//load component
import { LoadingButton, TextInput, TextAreaInput, ImageCardList, GenderPicker, PassionPicker, DatePicker } from '../../../../../../component';
import { userAction, userInitialState, userReducer } from '../../../../../../store';
import { getUserInfo, updateUserInfo} from '../../../../../../api/common/user';
import { getPassion } from '../../../../../../api/common/passion';
import { checkError } from '../../../../../../utils/utils';

export default function FormProfile({setLoading, setSnackbar, setSidebarHeader}) {
    const [state, dispatch] = useReducer(userReducer, userInitialState);
    const [cookies, setCookies] = useCookies('jwt');
    const [passions, setPassion] = useState([]);
    const history = useHistory();

    const {SET_USER_INFO, SET_USER_IMAGE, SET_USER_PASSION, SET_USER} = userAction;

    const token = cookies.jwt;
    
    useEffect(() => {
        setLoading(true);
        if(!token) history.push('/')
        Promise.all([getUserInfo({token}), getPassion()]).then((data) => {
            setPassion(data[1]);
            dispatch({
                type: SET_USER,
                payload: data[0]
            })
            setSidebarHeader(data[0])
            setLoading(false);
        }).catch((error) => {
            setSnackbar({
                isOpen: true,
                severity: 'error',
                message: `cant load user info due to ${error.message}`
            })
        })
    }, []);

    const changeHanlder = (e) => {
        // e.preventDefault();
        const {name, value} = e.target;
        dispatch({
            type: SET_USER_INFO,
            
            payload: {
                name: name,
                value: value,
                validate: true,
            }
        })
    }

    const passionChangeHandler = (e) => {
        e.preventDefault();
        const {value} = e.target;
        console.log(value);
        dispatch({
            type: SET_USER_PASSION,
            payload: {
                value: value
            }
        })
    }

    const imageChangeHandler = ({imagePublicID, imageURL}) => {
        console.log(imagePublicID, imageURL);
        dispatch({
            type: SET_USER_IMAGE,
            payload: {
                value: {
                    imagePublicID,
                    imageURL
                }
            }
        })
    }

    const userInfoSaveHandler = async(e) => {
        e.preventDefault();
        const checker = checkError(state.error);

        if(checker){
            try{
                const status = await updateUserInfo({token: token, body: state.user});
                const {modifiedCount, matchedCount} = status;
                if(modifiedCount && matchedCount) setSnackbar({
                    isOpen: true,
                    severity: 'success',
                    message: 'info updated successfully'
                })
                else setSnackbar({
                    isOpen: true,
                    severity: 'info',
                    message: 'info hasnt been changed'
                })  
            } catch(error) {
                setSnackbar({
                    isOpen: true,
                    severity: 'error',
                    message: `cant save user info due to ${error.message}`
                })
            }
            
        }
    }

    return (
        <div className='profile__form'>
            <div className='profile__form__content'>
                <h2 className="form__field-name">image</h2>
                <ImageCardList
                    row={[1,2]}
                    column={[1,2,3]}
                    onChange={imageChangeHandler}
                    inputImageList={state?.user?.info?.profileImage}
                    error={state?.error?.profileImage}
                />

                <h3>full name</h3>
                <TextInput 
                    name={'fullName'}
                    onChange={changeHanlder}
                    placeholder={state?.user?.info?.fullName}
                    error={state?.error?.fullName}
                />

                <h3>gender</h3>
                <GenderPicker
                    name={'gender'}
                    onClick={changeHanlder}
                    error={state?.error?.gender}
                    selected={state?.user?.info?.gender}
                />

                <h3>select passion</h3>
                <PassionPicker 
                    passions={passions}
                    selectPassion={passionChangeHandler}
                    selectedPassion={state?.user?.info?.passions}
                    error={state?.error?.passions}
                />

                <h3>date of birth</h3>
                <DatePicker 
                    label={'date of birth'}
                    name={'DateOfBirth'}
                    value={state?.user?.info?.DateOfBirth}
                    onChange={changeHanlder}
                    error={state?.error?.DateOfBirth}
                />

                <h3>tell us about yourself</h3>
                <TextAreaInput
                    value={state?.user?.info?.description}
                    name={'description'}
                    onChange={changeHanlder}
                />

                <div className='profile__content__form__button'>
                    <LoadingButton onClick={userInfoSaveHandler} placeholder={'save'} width={'200px'}/>
                </div>
            </div>
            
            
        </div>
    )
}