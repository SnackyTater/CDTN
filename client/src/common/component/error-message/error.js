import React from 'react';

import './error.css';

export default function error({message}) {
    return (
        <p className='error-message'>{message}</p>
    )
}
