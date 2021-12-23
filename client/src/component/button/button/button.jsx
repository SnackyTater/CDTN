import React from 'react';

import { Button as MuiButton } from '@mui/material';

export default function Button({placeholder, onClick, fullWidth, config}) {
    return (
        <MuiButton
            onClick={onClick}
            variant="contained"
            fullWidth={fullWidth}
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
