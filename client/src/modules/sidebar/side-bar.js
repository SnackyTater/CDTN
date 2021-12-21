import React from 'react';

import AvatarIcon from '../../common/component/avatar-icon/avatar-icon';
import {Home} from '@mui/icons-material'
import { IconButton } from '@mui/material';

import './side-bar.css'

export default function SideBar({header, content}) {
    const {image, fullName} = header;

    return (
        <div className='side-bar__container'>
            <div className='side-bar__header'>
                <a className='header__nav' href={'/profile'}>
                    <AvatarIcon image={image}/>
                    <span>bbbb</span>
                </a>
                <a className='header__nav' href={'/home'}>
                    <IconButton>
                        <Home/>
                    </IconButton>
                </a>
            </div>
            <div className='side-bar__content__container'>
                {content}
            </div>
        </div>
    )
}
