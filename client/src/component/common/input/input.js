import React from 'react';
import './input.css'

export default function input({name, type, placeholder, disableStatus, onChange, error}) {
    
    return (
        <div>
            <input name={name} type={type} placeholder={placeholder} onChange={onChange} disabled={disableStatus? "disable" : ""}/>
            {(error?.status) ? (<p style={{color: 'red', textAlign: 'center'}}>{error?.message}</p>):(null)}
        </div>
    )
}