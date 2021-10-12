import { useState } from 'react';

import Navbar from "./navbar/navbar";
import Login from "../../form/login/login";
import Signup from '../../form/signup/signup';
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
                    <button className="landing-signup-button" onClick={openSignupForm}>Signup</button>
                </div>
            </div>
            <Login isOpen={isLoginOpen} closeLoginForm={closeLoginForm} />
            <Signup isOpen={isSignupOpen} closeSignupForm={closeSignupForm} />
        </>
    )
}