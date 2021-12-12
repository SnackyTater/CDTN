import React from 'react';

import './loading.css';

export default function loading() {
    return (
        <div className='loading'>
            <img className='loading__image' src={process.env.PUBLIC_URL + '/assets/loading.gif'}/>
        </div>
    )
}
