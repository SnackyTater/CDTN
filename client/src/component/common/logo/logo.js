import React from 'react';
import './logo.css';

export default function logo() {
    return (
        <div className="logo">
            <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="logo"/>
            <p>Cosmitto</p>
        </div>
    )
}
