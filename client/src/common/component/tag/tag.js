import {useState} from 'react';

import './tag.css'

export default function Tag({content, onClick, className, key}) {
    const [isActive, setActive] = useState('');

    const buttonHandler = (e) => {
        e.preventDefault();
        onClick && onClick();
        if(isActive === 'active') setActive('');
        else setActive('active');
    }

    return (
        <div className={className ? className : `tag ${isActive}`} key={key} onClick={buttonHandler}>{content}</div>
    )
}
