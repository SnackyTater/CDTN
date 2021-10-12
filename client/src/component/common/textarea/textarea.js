import React from 'react';
import './textarea.css';

export default function Textarea({name, placeholder, onChange}) {
    return (
        <textarea name={name} placeholder={placeholder} onChange={onChange}/>
    )
}
