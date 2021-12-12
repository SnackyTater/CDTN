import {useEffect, useState} from 'react';

import Avatar from '../../../common/avatar/avatar';

import './profile.css';

export default function Profile() {

    const [image] = useState("https://images-ssl.gotinder.com/614c0042ce39c601005fa4fc/172x216_7edff9c9-42fc-4ec4-ba68-52cb0649362a.jpg");
    
    return (
        <div style={{display: 'flex', height: '100vh', width: '100vw'}}>
            <aside className='side-bar__container'>
                <div className='side-bar__inner-upper'>
                    <a className='side-bar__profile-nav' href='/profile'>
                        <p>my profile</p>
                    </a>
                    <a>
                        home
                    </a>
                </div>
                <div className='side-bar__inner-lower'>
                    <div>
                        <p>Account</p>
                        <div>edit account</div>
                    </div>
                    <div>
                        <p>match making config</p>
                        <div>age</div>
                        <div>gender</div>
                        <div>range</div>
                    </div>
                    <div>
                        logout
                    </div>
                </div>
            </aside>
            <div className='profile__container'>
                <div className='profile__card'>
                    <div>
                        profile image
                    </div>
                    <div>full name</div>
                    <div>gender</div>
                    <div>description</div>
                    <div>passion</div>
                </div>
            </div>
        </div>
    )
}
