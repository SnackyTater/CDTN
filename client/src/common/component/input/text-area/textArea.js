import React from 'react';

import './textArea.css';

export default function textArea({name, onChange}) {
    return (
        <textarea className='text-area' name={name} onChange={onChange}/>
    )
}
