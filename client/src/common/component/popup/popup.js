import React from 'react';

import { Backdrop } from '@mui/material';

export default function popup({content, isOpen, closePopup}) {
    return (
        <Backdrop
            sx={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
            open={isOpen}
            onClick={() => {closePopup(); console.log('s')}}
        >
            <div style={{backgroundColor: 'white', color: 'black', borderRadius: '5px'}}>
                {content}
            </div>
        </Backdrop>
    )
}
