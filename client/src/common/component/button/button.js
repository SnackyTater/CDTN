import {useState} from 'react';

import './button.css'

export default function Button({content, onClick, className}) {
    const [isActive, setActive] = useState('');

    const buttonHandler = (e) => {
        e.preventDefault();
        if(!onClick){
            if(isActive === 'active-button') setActive('');
            else setActive('active-button');
        } else {
            onClick();
        }
    }

    return (
        <button className={className ? className : `button ${isActive}`} onClick={buttonHandler}>{content}</button>
    )
}
