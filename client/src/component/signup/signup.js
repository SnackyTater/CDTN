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

    // const register = (data) => {
    //     axios.post
    // } 

    

    if(isLoading) return null;
    return (
        <div className="signupForm">
            <div className="formContainer">
                <div className="InfoHolder">
                    <div className="accountInfoOuter">
                        <div className="accountInfoInner">
                            <p>user's account</p>
                            <form>
                                {userProfile?.accountInfo?.username}
                                <input name="username" type="text" placeholder="username" onChange={accountInfoChangeHandler}/>
                                <input name="email" type="text" placeholder={email? email : 'email'} disabled={email? "disabled" : ""} onChange={accountInfoChangeHandler}/>
                                <input name="mobileNumber" type="text" placeholder={mobile? mobile : 'mobile'} disabled={mobile? "disabled" : ""} onChange={accountInfoChangeHandler}/>
                                <input name="password" type="password" placeholder="password" onChange={accountInfoChangeHandler}/>
                                <input name="password2" type="password" placeholder="re-enter password"/>
                            </form>
                        </div>
                    </div>
                    <div className="userInfoOuter">
                        <div className="userInfoInner">
                            <p>user's bio</p>
                            <form>
                                <input name="fullName" placeholder="full name" type="text" onChange={userInfoChangHandler}/>
                                <input name="DOB" placeholder="date of birth" type="date" onChange={userInfoChangHandler}/>
                                <textarea name="description" placeholder="write something about yourself" onChange={userInfoChangHandler}/>
                                <select onClick={userGenderChangeHandler}>
                                    <option value="" disabled selected hidden>gender</option>
                                    <option value="unknown">prefer not saying</option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </select>
                            </form>
                            <p>passions</p>
                            <div className="checkBoxList">
                                { passions.map((passion) => {
                                    return <div><input type="checkbox" name={passion.id} onClick={userPassionsChangeHandler}/>{passion.name}</div>
                                })}
                            </div>
                            <div className="userProfileImage">
                                <p>profile image</p>
                                <span>upload atleast 1 image to continue</span>
                                <input className="image__holder"type="file" onChange={(e) => {setImage(e.target.files[0])}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="signup__button" onClick={() => {console.log(userProfile)}}>sign up</button>
            </div>
        </div>
    )
}