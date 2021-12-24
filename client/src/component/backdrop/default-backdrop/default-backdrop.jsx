import React from 'react';
import {Backdrop} from '@mui/material';
import { Close } from '@mui/icons-material';
import { IconButton } from '../../index';

import './default-backdrop.scss';

export default function DefaultBackdrop({isOpen, config, children, closeForm, title}) {
    return (
        <Backdrop 
            sx={config || {color: '#fff', zIndex: '2'}}
            open={isOpen}
        >
            <div className='backdrop__form__container'>
                <div className='backdrop__form__button__container'>
                    <IconButton 
                        icon={<Close/>}
                        onClick={closeForm}
                    />
                </div>
                <span>{title}</span>
                <div className='backdrop__form__content__container'>
                    {children}
                </div>
            </div>
        </Backdrop>
    )
}
