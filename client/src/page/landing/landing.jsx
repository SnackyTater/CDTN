import { useState } from 'react';

import { Navbar, DefaultButton } from '../../component';
import LoginPopup from './component/main/popup/login/login';
import SignupPopup from './component/main/popup/signup/signup';

import './landing.scss';

export default function Landing() {
    const [isLoginOpen, setIsLoginOpen ] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const openLoginForm = () => setIsLoginOpen(true);
    const closeLoginForm = () => setIsLoginOpen(false);

    const openSignupForm = () => setIsSignupOpen(true);
    const closeSignupForm = () => setIsSignupOpen(false);

    return(
        <>
            <header className="landing__header__container">
                <Navbar openLoginForm={openLoginForm} mode={'dark'}/>
            </header>
            <div className="landing__content__container" style={{backgroundImage: 'url("/assets/couple-silhouette-evening-5k-2j-1920x1080.jpg")'}}>
                <div className="landing__content">
                    <p>Swipe right</p>
                    <div className='landing__content__button__container'>
                        <DefaultButton placeholder={'sign up'} onClick={openSignupForm}/>
                    </div>
                </div>
            </div>
            <LoginPopup isOpen={isLoginOpen} closeForm={closeLoginForm}/>
            <SignupPopup isOpen={isSignupOpen} closeForm={closeSignupForm}/>
        </>
    )
}