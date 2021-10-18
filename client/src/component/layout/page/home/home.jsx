import React from 'react';

import Card from '../../../common/card/card'

import './home.css';

export default function Home() {
    return (
        <div className="home-container">
            <div className="side-bar">
                <div className="icon-holder">
                    logo
                </div>
                <div className="home-nav-holder">
                    to profile
                </div>
                <div className="notification-holder">
                    noti
                </div>
            </div>
            <div className="card-holder">
                <div className="card">
                    <Card/>
                </div>
            </div>
        </div>
    )
}
