import { useHistory, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import './signup.css';

export default function Signup(){
    //use hooks for state
    //for render
    const [passions, setPassions] = useState([{name: 'aaa'}, {name: 'bbbb'}]);
    const [isLoading, setIsLoading] = useState(true);
    
    //for user info
    const [image, setImage] = useState(null);
    const [userProfile, setUserProfile] = useState({
        accountInfo:{
            username: '',
            password: '',
            email: '',
            mobileNumber: '',
        },
        userInfo:{
            fullName: '',
            gender: '',
            DateOfBirth: '',
            description: '',
            passions: [],
        }
    });
    
    const accountInfoChangeHandler = (e) => {
        let {name, value} = e.target
        setUserProfile({...userProfile, accountInfo:{ ...userProfile.accountInfo, [name]: value}});
    }

    const userInfoChangHandler = (e) => {
        let {name, value} = e.target;
        setUserProfile({...userProfile, userInfo:{ ...userProfile.userInfo, [name]: value}});
    }

    const userGenderChangeHandler = (e) => {
        setUserProfile({...userProfile, userInfo:{ ...userProfile.userInfo, gender: e.target.value}});
    }

    const userPassionsChangeHandler = (e) => {
        console.log(e.target.name)
        // let checkExistIndex = passions.indexOf(e.target.value)
        // if(checkExistIndex !== -1)
        // {
        //     setUserProfile({...userProfile, userInfo:{ ...userProfile.userInfo, passions: [...e.target.value]}});
        // } 
        // if (checkExistIndex === -1 ){
        //     let newPassions = passions.splice(checkExistIndex, 1);
        //     setUserProfile({...userProfile, userInfo:{ ...userProfile.userInfo, passions: newPassions}});
        // }
    }

    //props send from router navigator (history)
    const location = useLocation();
    let email = location?.state?.email;
    let mobile = location?.state?.mobile;

    //router navigator
    const history = useHistory();

    //component did mount (but hooks ?)
    useEffect(() => {
        // email = 'taterazay98@gmail.com';
        // if(email || mobile){
        //     axios.get('http://localhost:5000/api/passion')
        //         .then((res) => {
        //             setPassions(res.data);
        //             setIsLoading(false);
        //         })
        //         .catch((err) => {console.log(err)});
        // }
        // else history.push('/');
    }, []);

    // const register = (data) => {
    //     axios.post
    // } 

    

    if(isLoading) return null;
    return (
        <div className="background">
            <div className="signup-form">
                <div className="accountInfo">
                    <p>account info</p>
                    <form className="accountInfo__form">
                        <input className="accountInfo__form__input" type="text"     placeholder="username"                  onChange={accountInfoChangeHandler}/>
                        <input className="accountInfo__form__input" type="text"     placeholder={email?(email):('email')}   onChange={accountInfoChangeHandler} disabled={email? "disabled" : ""}/>
                        <input className="accountInfo__form__input" type="text"     placeholder={mobile?(mobile):('mobile')}onChange={accountInfoChangeHandler} disabled={mobile? "disabled" : ""}/>
                        <input className="accountInfo__form__input" type="password" placeholder="password"                  onChange={accountInfoChangeHandler}/>
                        <input className="accountInfo__form__input" type="password" placeholder="re-enter password"         onChange={accountInfoChangeHandler}/>
                    </form>
                </div>
                <div className="userInfo">
                    <p>user info</p>
                    <form className="userInfo__infoForm">
                        <input className="userInfo__infoForm__input" type="text"    placeholder="fullname"/>
                        <input className="userInfo__infoForm__input" type="date"    placeholder="date of birth"/>
                        <select className="userInfo__infoForm__input">
                            <option value="" disabled selected hidden>gender</option>
                            <option value="unknown">prefer not saying</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                        <textarea className="userInfo__infoForm__input" placeholder="tell us about your self"/>
                        <div className="userInfo__infoForm__input">

                        </div>
                    </form>
                    <p>user avatar</p>
                    <p>please select atleast 1 image for your avatar</p>
                    <form className="userInfo__avatar">
                        <input className="userInfo__avatar__input" type="file"/>
                        <input className="userInfo__avatar__input" type="file"/>
                        <input className="userInfo__avatar__input" type="file"/>
                    </form>
                </div>
            </div>
        </div>
    )
}