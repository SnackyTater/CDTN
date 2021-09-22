import { useHistory, useLocation } from "react-router";
import { useEffect } from "react";

import './signup.css';

export default function Signup(){
    const location = useLocation();
    const history = useHistory();
    const email = location?.state?.email;
    const mobile = location?.state?.mobile;

    //simple route auth
    useEffect(() => {
        if(email === undefined)
            history.push('/')
    });

    return (
        <div className="container">
            <div className="info__holder">
                <div className="account__info__holder">
                    <form>
                        <label for="username">username</label>
                        <input name="username" type="text"/>
                        <br/>
                        <label for="password">password</label>
                        <input name="password" type="password"/>
                        <br/><label for="password2">re-enter password</label>
                        <input name="password2" type="password"/>
                        <br/>
                        <label for="email">email</label>
                        <input name="email" type="text"/>
                        <br/>
                        <label for="mobile">mobile</label>
                        <input name="mobile" type="text"/>
                        <br/>
                    </form>
                </div>
                <div className="user__info__holder">
                    <form>
                        <label for="name">full name</label>
                        <input name="name" type="text"/>
                        <br/>
                        <label for="DOB">date of birth</label>
                        <input name="DOB" type="date"/>
                        <br/>
                        <label for="gender">gender</label>
                        <select name="gender">
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="unkown">prefer not to say</option>
                        </select>
                        <br/>
                        <label for="description">tell use about yourself</label>
                        <textarea name="description"/>
                        <br/>
                        <label>passion</label>
                        <input name="passiona" type="checkbox" value="aaaa"/><span>male</span>
                        <br/>
                    </form>
                </div>
            </div>
            <button id="signup__button">submit</button>
        </div>
    )
}