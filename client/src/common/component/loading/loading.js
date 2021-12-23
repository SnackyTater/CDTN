import React from 'react';

import { Backdrop, CircularProgress } from '@mui/material'

export default function loading({config, isLoading}) {
    return (
        <Backdrop
            sx={config || {color: '#fff'}}
            open={isLoading}
        >
            <CircularProgress color='inherit'/>
        </Backdrop>
    )
}
