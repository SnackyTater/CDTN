import { useHistory, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import './signup.css';

export default function Signup(){
    //use hooks for state
    //for render
    const [passions, setPassions] = useState([]);
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
        let {name, value} = e.target;
        if(name === 'username') checkUsername(value);
        if(name === 'password') checkPassword(value);
        if(name === 'email') checkEmail(value);
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
        let passionsList = userProfile.userInfo.passions;
        let checkPassionIndex = passionsList.indexOf(e.target.value);

        //if passion not exist in userInfo push in
        if(checkPassionIndex === -1) passionsList.push(e.target.value);
        //if exist splice it out
        else passionsList.splice(checkPassionIndex, 1);

        setUserProfile({...userProfile, userInfo:{...userProfile.userInfo, passions: passionsList}});
    }

    //for error form
    const [formError, setFormError] =  useState({
        username: { status: false, message: '' }, 
        password: {status: false, message: ''}, 
        reEnterPassword: {status: false, message: ''},
        email: { status: false, message: ''}, 
        DateOfBirth: {status: false, message: ''}
    })

    const checkUsername = (username) => {
        if( username === undefined || username.length < 8) 
            setFormError({...formError, username: {...formError.username, status: true, message: 'username must be atleast 8 characters long'}});
        else 
            setFormError({...formError, username: {...formError.username, status: false}});
    }
    
    const checkPassword = (password) => {
        if( password === undefined || password.length < 8) 
            setFormError({...formError, password: {...formError.password, status: true, message: 'password must be atleast 8 characters long'}});
        else 
            setFormError({...formError, password: {...formError.password, status: false}});
    }

    const checkReEnterPassword = (e) => {
        console.log(userProfile.accountInfo.password)
        console.log(e.target.value)
        if(userProfile.accountInfo.password !== e.target.value)
            setFormError({...formError, reEnterPassword: {...formError.reEnterPassword, status: true, message: 'password does not match'}});
        else
            setFormError({...formError, reEnterPassword: {...formError.reEnterPassword, status: false}});
    }

    const checkEmail = (email) => {
        const checker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log(checker.test(email))
        console.log(formError)
        if(checker.test(email))
            setFormError({...formError, email: {...formError.email, status: false}});
        else
            setFormError({...formError, email: {...formError.email, status: true, message: 'invalid email'}});
    }

    //props send from router navigator (history)
    const location = useLocation();
    let email = location?.state?.email;
    let mobile = location?.state?.mobile;

    //router navigator
    const history = useHistory(); 

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

    const signup = (e) => {
        e.preventDefault();
        
    }

    if(isLoading) return null;
    return (
        <div className="background">
            <div className="signup-form">
                <div className="form">
                    <div className="accountInfo">
                        <p className="title">account info</p>
                        <form className="accountInfo__form">
                            <input name="username"          className="accountInfo__form__input" type="text"     placeholder="username"                  onChange={accountInfoChangeHandler}/>
                            {(formError.username.status) ? (<p className="error">{formError.username.message}</p>):(null)}
                            <input name="email"             className="accountInfo__form__input" type="text"     placeholder={email?(email):('email')}   onChange={accountInfoChangeHandler} disabled={email? "disabled" : ""}/>
                            {(formError.email.status) ? (<p className="error">{formError.email.message}</p>):(null)}
                            <input name="mobileNumber"      className="accountInfo__form__input" type="text"     placeholder={mobile?(mobile):('mobile')}onChange={accountInfoChangeHandler} disabled={mobile? "disabled" : ""}/>
                            <input name="password"          className="accountInfo__form__input" type="password" placeholder="password"                  onChange={accountInfoChangeHandler}/>
                            {(formError.password.status) ? (<p className="error">{formError.password.message}</p>):(null)}
                            <input name="reEnterPassword"   className="accountInfo__form__input" type="password" placeholder="re-enter password"         onChange={checkReEnterPassword}/>
                            {(formError.reEnterPassword.status) ? <p className="error">{formError.reEnterPassword.message}</p> : null}
                        </form>
                    </div>
                    <div className="userInfo">
                        <div className="userInfo-col">
                            <p className="title">user info</p>
                            <form className="userInfo__form">
                                <input name="fullName"   className="userInfo__form__input" type="text"    placeholder="full name"     onChange={userInfoChangHandler}/>
                                <input name="DateOfBirth"className="userInfo__form__input" type="date"    placeholder="date of birth" onChange={userInfoChangHandler}/>
                                {(formError.email) ? (<p className="error">password does not match</p>):(null)}
                                <select name="gender"    className="userInfo__form__input" onClick={userGenderChangeHandler}>
                                    <option value="" disabled selected hidden>gender</option>
                                    <option value="unknown">prefer not saying</option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </select>
                                <textarea name="description"    className="userInfo__form__input" placeholder="tell us about your self" onChange={userInfoChangHandler}/>
                                <div className="checkBoxList">
                                    {
                                        passions.map((passion) => {
                                            return <label><input type="checkbox" value={passion._id} onClick={userPassionsChangeHandler}/><span>{passion.name}</span></label>
                                        })
                                    }
                                </div>
                            </form>
                        </div>
                        <div className="userInfo-col">
                            <p className="title">user avatar</p>
                            <p>please select atleast 1 image for your avatar</p>
                            <form className="userInfo__avatar">
                                <input className="userInfo__avatar__input" type="file"/>
                                <input className="userInfo__avatar__input" type="file"/>
                                <input className="userInfo__avatar__input" type="file"/>
                            </form>
                        </div>
                    </div>
                </div>
                <button className="form__button" onClick={signup}>Sign up</button>
            </div>
        </div>
    )
}