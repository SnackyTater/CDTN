import { useHistory, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import './signup.css';
import Input from '../../../common/input/input';
import Select from '../../../common/select/select';
import Textarea from "../../../common/textarea/textarea";
import FileInput from '../../../common/input/file/input-file';

import Account from '../../../../common/user/accountInfo/account';
import User from '../../../../common/user/userInfo/user';

import {getLocation} from '../../../../common/utils/utils';

export default function Signup(){
    //form for user's account & user's info
    const { account, SetAccount, error: accountError, setError: setAccountError, accountSubmitChecker} = Account();
    const { user, SetUser, SetPassions, setToken, error: userError, userSubmitHandler} = User();

    const [coordinates, setCoordinates] = useState(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    
    //for render
    const [passions, setPassions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //etc
    const location = useLocation();
    const history = useHistory();
    let email = location?.state?.email;
    let mobile = location?.state?.mobile;

    //get passions list from server
    //componentDidMount()
    useEffect(() => {
        if(email || mobile){
            //get passions list
            axios.get('http://localhost:5000/api/passion')
                .then((res) => {
                    setPassions(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {console.log(err)});

            //
        }
        else history.push('/');
    }, []);

    //set value for form /w validation (2nd params is validation toggle)
    const accountChangHandler = (e) => {
        SetAccount(e, true);
    }

    const userChangeHandler = (e) => {
        SetUser(e, true);
    }

    const userPassionsChangeHandler = (e) => {
        SetPassions(e);
    }

    //image handler
    const imageHandler = (e) => {
        const image = e.target.files[0];
        setImage(image);
        setPreview(URL.createObjectURL(image))
    }

    //componentShouldUpdate (location)
    useEffect(async() => {
        if(coordinates){
            const userAccountChecker = accountSubmitChecker();
            const userInfoChecker = userSubmitHandler();
            if(userAccountChecker && userInfoChecker){
                //setup payload for signup
                const signupInfo = {
                    accountInfo: account, 
                    userInfo: user.userInfo,
                    matchMakingConfig: {
                        location: {
                            coordinates: [coordinates.longitude, coordinates.latitude]
                        }
                    }
                }
                console.log(signupInfo)

                //send signup info to server to create account
                try{
                    const createAccount = await axios.post('http://localhost:5000/api/account/signup', signupInfo);
                    const token = createAccount.data.access_token;

                    //send image to server
                    //create payload for image
                    const fd = new FormData();
                    fd.append('image', image);

                    //send image
                    const uploadImage = await axios.post('http://localhost:5000/api/profile/image', fd, {
                    headers: {
                        'Accept': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }})

                    console.log(uploadImage)
                    if(uploadImage){
                        setToken(token);
                        history.push('/home', {verified: true});
                    }

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
    }, [coordinates])

    const signup = (e) => {
        e.preventDefault();
        getLocation((location) => {
            const {longitude, latitude} = location.coords
            setCoordinates({latitude, longitude});
        })
    }


    if(isLoading) return null;
    return (
        <div className="background">
            <div className="signup-form">
                <div className="form">
                    <div className="account-info">
                        <p className="account-info__title">account info</p>
                        <form className="account-info__form">
                            <Input name="username"      type="text"     placeholder={"username"}                    onChange={accountChangHandler}  disableStatus={false}                       error={accountError.username}/>
                            <Input name="email"         type="text"     placeholder={email? (email) : ('email')}    onChange={accountChangHandler}  disableStatus={email? (true) : (false)}     error={accountError.email}/>
                            <Input name="mobileNumber"  type="text"     placeholder={mobile? (mobile): ('mobile')}  onChange={accountChangHandler}  disableStatus={mobile? (true) : (false)}    error={accountError.mobileNumber}/>
                            <Input name="password"      type="password" placeholder={"password"}                    onChange={accountChangHandler}  disableStatus={false}                       error={accountError.password}/>
                            <Input name="password2"     type="password" placeholder={"re-enter password"}           onChange={accountChangHandler}  disableStatus={false}                       error={accountError.password2}/>
                        </form>
                    </div>
                    <div className="user-info">
                        <div>
                            <p className="user-info__title">user info</p>
                            <form className="user-info__form">
                                <Input      name="fullName"     type="text"     placeholder={"fullname"}                onChange={userChangeHandler}    error={userError.fullName}/>
                                <Input      name="DateOfBirth"  type="date"     placeholder={"date of birth"}           onChange={userChangeHandler}    error={userError.DateOfBirth}/>
                                <Select     name="gender"       type={"gender"}                                         onChange={userChangeHandler}/>
                                <Textarea   name="description"                  placeholder={"tell use about yourself"} onChange={userChangeHandler}/>
                                <div className="checkBoxList">
                                    {
                                        passions.map((passion) => {
                                            return <label><input name="passions" type="checkbox" value={passion._id} onClick={userPassionsChangeHandler}/><span>{passion.name}</span></label>
                                        })
                                    }
                                </div>
                            </form>
                        </div>
                        <div>
                            <p className="user-info__title">user avatar</p>
                            <div className="user-info__avatar">
                                <FileInput onChange={imageHandler} image={image} preview={preview}/>
                            </div>
                            <image src={image}/>
                        </div>
                    </div>
                </div>
                <button className="form__button" onClick={signup}>Sign up</button>
            </div>
        </div>
    )
}