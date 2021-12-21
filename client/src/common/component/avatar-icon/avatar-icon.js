import React from 'react';

import { Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';

import './avatar-icon.css';

export default function avatarIcon({image, config, color}) {

    const imagePlaceholder = (image) ? (image) : (`${process.env.PUBLIC_URL}/assets/logo.png`)

    return (
        <Avatar 
            alt='avatar' 
            src={ image }
            sx={ config || {bgcolor: 'white'}}
        >
            {!image && <Person color={color || 'disabled'}/>}
        </Avatar>
    )
}
