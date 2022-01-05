import React from 'react';

import { Button as MuiButton } from '@mui/material';

import './button.scss';

export default function Button({placeholder, onClick, fullWidth, config}) {
    return (
        <MuiButton
            onClick={onClick}
            variant="contained"
            fullWidth={fullWidth}
            className='MuiButtonBase-root-MuiButton-root'
            sx={config || {
                "backgroundImage": "linear-gradient(45deg,#fd267a,#ff7854)",
                "borderRadius": '100px',
                "color": 'white',
                "height": "100%",
                "fontSize": '1.3em',
                "positon": 'fiex'
            }}
        >
            {placeholder}
        </MuiButton>
    )
}
