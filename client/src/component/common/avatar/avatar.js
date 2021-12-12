import React from 'react';

import './avatar.css'

export default function avatar({image}) {
    return (
        <div className='avatar' style={{"backgroundImage": `url(${image})`}}/>
    )
}
