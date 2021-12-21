import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

//css
import './signup.css';

//load component
import ErrorMessage from '../../common/component/error-message/error';
import Loading from "../../common/component/loading/loading";
import CustomTextInput from '../../common/component/input/text/input';
import LoadingButton from "../../common/component/button/loading-button/loading-button";

//load module
import GenderPicker from '../../modules/gender-picker/genderPicker';
import PassionPicker from "../../modules/passions-picker/passion-picker";
import ImageCardList from "../../modules/image-card-list/image-card-list";

//utils
import {getLocation} from '../../utils/utils';

//hooks
import accountHook from '../../common/hooks/accountInfo/account';
import userHook from '../../common/hooks/userInfo/user';

import {getPassion} from '../../api/common/passion';

export default function Signup(){
    const [isLoading, setLoading] = useState(true);
    const [isButtonLoading, setButtonLoading] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [passions, setPassions] = useState([]);

    const { account, SetAccount, error: accountError, setError: setAccountError, accountSubmitChecker} = accountHook();
    const { user, SetUser, SetPassions, setToken, SetImage,error: userError, userSubmitHandler} = userHook();

    const history = useHistory();

    useEffect(() => {
        if(isLoading){
            //get location
            getLocation().then((location) => {
                setCoordinates({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude
                })
                
                getPassion().then((passionList) => {
                    setPassions(passionList);
                    setLoading(false);
                })
            }).catch((error) => {
                alert(`${error.message}, please reload page and allow it`)
            })
        }
    }, []);

    const accountChangeHandler = (e) => {
        SetAccount(e, true);
    }

    const userChangeHandler = (e) => {
        SetUser(e, true);
    }

    const userPassionsChangeHandler = (e) => {
        SetPassions(e);
    }

    const userImageChangeHandler = (imageInfo) => {
        console.log('aaaa')
        SetImage(imageInfo);
    }

    const signupHandler = async(e) => {
        const accountChecker = accountSubmitChecker();
        const userChecker = userSubmitHandler();
        if(accountChecker && userChecker){
            const payload = {
                accountInfo: account,
                userInfo: {
                    info: user.userInfo,
                    matchMaking:{
                        config: {
                            location: {
                                coordinates: [coordinates.longitude, coordinates.latitude]
                            }
                        }
                    }
                }
            }

            try{
                const status = await axios.post('http://localhost:5000/account', payload);
                setToken(status.data);
                history.push('/home');
            } catch(err) {
                const message = err?.response?.data;
                const error = {}
                if(message?.includes('username')) error.username = {status: false, message: 'username has been used'}
                if(message?.includes('email')) error.email = {status: false, message: 'email has been used'}
                if(message?.includes('mobile')) error.mobileNumber = {status: false, message: 'mobile has been used'}

                message && setAccountError({...accountError, ...error})
            }
            
            
        }
    }

    return (
        <div>
            {isLoading && <Loading/>}
            <div className="signup__container">
                <div className="signup__form">
                    <div className="form__container">
                        <div className="form__content">
                            <CustomTextInput
                                label={'username'}
                                name={'username'} 
                                onChange={accountChangeHandler} 
                                error={accountError.username}
                            />
                            <CustomTextInput
                                label={'email'}
                                name={'email'} 
                                onChange={accountChangeHandler} 
                                error={accountError.email}
                            />
                            <CustomTextInput
                                label={'mobile'}
                                name={'mobileNumber'} 
                                onChange={accountChangeHandler} 
                                error={accountError.mobileNumber}
                            />
                            <CustomTextInput
                                label={'password'}
                                name={'password'} 
                                type={'password'} 
                                onChange={accountChangeHandler} 
                                error={accountError.password}
                            />
                            <CustomTextInput
                                label={'re-enter password'}
                                name={'password2'} 
                                type={'password'} 
                                onChange={accountChangeHandler} 
                                error={accountError.password2}
                            />
                        </div>
                    </div>
                    <div className="form__container">
                        <div className="form__contents">
                            <h2 className="form__field-name">image</h2>
                            <ImageCardList row={[1,2,3]} column={[1]} onChange={(imageInfo) => {userImageChangeHandler(imageInfo)}}/>
                            {(!userError.profileImage.status) ? <ErrorMessage message={userError.profileImage.message}/> : null}
                            <br/>

                            <h2 className="form__field-name">gender</h2>
                            <GenderPicker onClick={(gender) => {userChangeHandler({target: {name: 'gender', value: gender}})}}/>
                            <br/>

                            <h2 className="form__field-name">passions</h2>
                            <PassionPicker 
                                passions={passions} 
                                selectPassion={(passion) => {userPassionsChangeHandler(passion)}} 
                                selectedPassion={user.info.passions}
                            />
                            <br/>

                            <CustomTextInput
                                label={'full name'}
                                name={'fullName'} 
                                onChange={userChangeHandler} 
                                error={userError.fullName}
                            />

                            <CustomTextInput name={'DateOfBirth'} type={'date'} onChange={userChangeHandler} error={userError.DateOfBirth}/>
                            <CustomTextInput
                                label={'tell us about yourself'} 
                                name={'description'} 
                                onChange={userChangeHandler}
                            />

                            
                            {(!userError.passions.status) ? <ErrorMessage message={userError.passions.message}/> : null}
                        </div>
                    </div>
                </div>
                <br/>
                <div className="signup__button">
                    <LoadingButton 
                        onClick={signupHandler} 
                        isLoading={isButtonLoading} 
                        placeholder={'sign up'}
                    />
                </div>
            </div>
        </div>
    )
}