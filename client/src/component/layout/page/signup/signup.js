import { useHistory, useLocation } from "react-router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import './signup.css';
import Input from '../../../common/input/input';
import Select from '../../../common/select/select';
import Textarea from "../../../common/textarea/textarea";
import FileInput from '../../../common/input/file/input-file';

import Account from '../../../../common/user/accountInfo/account';
import User from '../../../../common/user/userInfo/user';

export default function Signup(){
    //form for user's account & user's info
    const {account, SetAccount, error: accountError, SetError: SetAccountError} = Account();
    const {user, SetUser, error: userError, SetError: SetUserError} = User();
    const {image, setImage} = useState(null);
    
    //for render
    const [passions, setPassions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //etc
    const location = useLocation();
    const history = useHistory();
    let email = location?.state?.email;
    let mobile = location?.state?.mobile;

    // const userPassionsChangeHandler = (e) => {
    //     let passionsList = userProfile.userInfo.passions;
    //     let checkPassionIndex = passionsList.indexOf(e.target.value);

    //     //if passion not exist in userInfo push in
    //     if(checkPassionIndex === -1) passionsList.push(e.target.value);
    //     //if exist splice it out
    //     else passionsList.splice(checkPassionIndex, 1);

    //     setUserProfile({...userProfile, userInfo:{...userProfile.userInfo, passions: passionsList}});
    // }

    useEffect(() => {
        email = 'taterazay98@gmail.com';
        if(email || mobile){
            axios.get('http://localhost:5000/api/passion')
                .then((res) => {
                    setPassions(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {console.log(err)});
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

    //image handler



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
                                <Select     name="gender"       type={"gender"}                                         onClick={userChangeHandler}/>
                                <Textarea   name="description"                  placeholder={"tell use about yourself"} onChange={userChangeHandler}/>
                                <div className="checkBoxList">
                                    {
                                        passions.map((passion) => {
                                            return <label><input type="checkbox" value={passion._id} onClick={userChangeHandler}/><span>{passion.name}</span></label>
                                        })
                                    }
                                </div>
                            </form>
                        </div>
                        <div>
                            <p className="user-info__title">user avatar</p>
                            <div className="user-info__avatar">
                                <FileInput onChange={userChangeHandler}/>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="form__button" onClick={(e) => {console.log('blin')}}>Sign up</button>
            </div>
        </div>
    )
}