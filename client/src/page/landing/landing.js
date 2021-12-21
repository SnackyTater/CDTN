import { useState } from 'react';

import Button from '../../common/component/button/button/button';
import Navbar from "../../modules/navbar/navbar";
import Login from "../../modules/popup-form/login/login";
import Signup from '../../modules/popup-form/email-verificate/signup';

import './landing.css';

export default function Landing() {
    const [isLoginOpen, setIsLoginOpen ] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const openLoginForm = () => setIsLoginOpen(true);
    const closeLoginForm = () => setIsLoginOpen(false);

    const openSignupForm = () => setIsSignupOpen(true);
    const closeSignupForm = () => setIsSignupOpen(false);

    return(
        <>
            <header className="nav-holder">
                <Navbar openLoginForm={openLoginForm}/>
            </header>
            <div className="banner" style={{backgroundImage: 'url("/assets/couple-silhouette-evening-5k-2j-1920x1080.jpg")'}}>
                <div className="landing-signup-button-holder">
                    <p>Swipe right</p>
                    <div className='button__container'>
                        <Button placeholder={'sign up'} onClick={openSignupForm}/>
                    </div>
                    
                </div>
            </div>
            <Login isOpen={isLoginOpen} closeLoginForm={closeLoginForm} />
            <Signup isOpen={isSignupOpen} closeSignupForm={closeSignupForm} />
        </>
    )
}