import React from 'react';
import './input.css'

import {TextField} from '@mui/material';

export default function Input({name, label, disableStatus, onChange, error, type, placeholder, InputProps}) {

    return (
        <div>
            <TextField 
                InputLabelProps={{ shrink: true }}
                InputProps={InputProps}
                error={error && !error.status}
                helperText={error ? error.message : ' '}
                label={label}
                name={name}
                disabled={disableStatus}
                onChange={onChange}
                type={type}
                fullWidth
                value={placeholder}
                sx={{
                    "width": '400px',
                    "alignSelf": 'center',
                    "paddingBottom": '15px',
                }}
            />
        </div>
        
    )
}