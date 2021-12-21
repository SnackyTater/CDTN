import React from 'react';

import { Backdrop, CircularProgress } from '@mui/material'

import './loading.css';

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
