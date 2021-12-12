import React from 'react';
import './input.css'

export default function input({name, type, placeholder, disableStatus, onChange, error}) {
    
    return (
        <div>
            <input className="input-text" name={name} type={type ? type : 'text'} placeholder={placeholder} onChange={onChange} disabled={disableStatus? "disable" : ""}/>
            {(error?.status) ? (null):(<p style={{color: 'red', textAlign: 'center'}}>{error?.message}</p>)}
        </div>
    )
}