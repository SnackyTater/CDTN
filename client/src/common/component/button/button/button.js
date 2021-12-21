import React from 'react';

import Button from '@mui/material/Button';

export default function button({placeholder, onClick}) {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            fullWidth="true"
            sx={{
                "backgroundImage": "linear-gradient(45deg,#fd267a,#ff7854)",
                "borderRadius": '100px',
                "color": 'white',
                "height": "100%",
                "fontSize": '1.3em',
                "positon": 'fiex'
            }}
        >
            {placeholder}
        </Button>
    )
}
