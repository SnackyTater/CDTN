import { useHistory, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

//css
import './signup.css';

//load component
import ErrorMessage from '../../common/component/error-message/error';
import Loading from "../../common/component/loading/loading";
import CustomTextInput from '../../common/component/input/text/input';
import CustomTextArea from '../../common/component/input/text-area/textArea';

//load module
import GenderPicker from '../../modules/gender-picker/genderPicker';
import PassionPicker from "../../modules/passions-picker/passion-picker";
import ImageCardList from "../../modules/image-card-list/image-card-list";

//utils
import {getLocation} from '../../utils/utils';

//hooks
import accountHook from '../../common/hooks/accountInfo/account';
import userHook from '../../common/hooks/userInfo/user';

export default function Signup(){
    const [isLoading, setLoading] = useState(true);
    const [coordinates, setCoordinates] = useState(null);
    const [passions, setPassions] = useState([]);

    const { account, SetAccount, error: accountError, setError: setAccountError, accountSubmitChecker} = accountHook();
    const { user, SetUser, SetPassions, setToken, SetImage,error: userError, userSubmitHandler} = userHook();

    const history = useHistory();

    useEffect(async() => {
        try{
            if(isLoading){
                //get location
                const location = await getLocation();
                setCoordinates({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude
                })
                
                //get passions list
                const result = await axios.get('http://localhost:5000/passion');
                setPassions(result.data);
                setLoading(false);
            }
        } catch(err) {
            console.log(err);
            alert(`${err.message}, please reload page and allow it`)
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
                    <div className="form__account">
                        <h2 className="form__field-name">username</h2>
                        <CustomTextInput name={'username'} onChange={accountChangeHandler} error={accountError.username}/>
                        <h2 className="form__field-name">email</h2>
                        <CustomTextInput name={'email'} onChange={accountChangeHandler} error={accountError.email}/>
                        <h2 className="form__field-name">mobile</h2>
                        <CustomTextInput name={'mobileNumber'} onChange={accountChangeHandler} error={accountError.mobileNumber}/>
                        <h2 className="form__field-name">password</h2>
                        <CustomTextInput name={'password'} type={'password'} onChange={accountChangeHandler} error={accountError.password}/>
                        <h2 className="form__field-name">re-enter password</h2>
                        <CustomTextInput name={'password2'} type={'password'} onChange={accountChangeHandler} error={accountError.password2}/>
                    </div>
                    <div className="form__info">
                        <h2 className="form__field-name">image</h2>
                        <ImageCardList limit={[1,2,3]} onChange={(imageInfo) => {userImageChangeHandler(imageInfo)}}/>
                        {(!userError.profileImage.status) ? <ErrorMessage message={userError.profileImage.message}/> : null}
                        <br/>
                        <h2 className="form__field-name">full name</h2>
                        <CustomTextInput name={'fullName'} onChange={userChangeHandler} error={userError.fullName}/>
                        <h2 className="form__field-name">gender</h2>
                        <GenderPicker onClick={(gender) => {userChangeHandler({target: {name: 'gender', value: gender}})}}/>
                        <h2 className="form__field-name">date of birth</h2>
                        <CustomTextInput name={'DateOfBirth'} type={'date'} onChange={userChangeHandler} error={userError.DateOfBirth}/>
                        <h2 className="form__field-name">tell us about yourself</h2>
                        <CustomTextArea name={'description'} onChange={userChangeHandler}/>
                        <h2 className="form__field-name">passions</h2>
                        <PassionPicker 
                            passions={passions} 
                            selectPassion={(passion) => {userPassionsChangeHandler(passion)}} 
                            selectedPassion={user.userInfo.passions}
                        />
                        {(!userError.passions.status) ? <ErrorMessage message={userError.passions.message}/> : null}
                    </div>
                </div>
                <br/>
                <button className="signup__button" onClick={signupHandler}>sign up</button>
            </div>
        </div>
    )
}