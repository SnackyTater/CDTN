import React from 'react';

import {List, ListItemButton, ListItemText, ListItemIcon} from '@mui/material';
import {Person, AccountCircle, Settings, PowerSettingsNew, DeleteForever} from '@mui/icons-material';

export default function SidebarContent({navigateTo, openPopup}) {
    const itemList = [
        { name: 'profile', icon: <Person />, type: 'form'},
        { name: 'account', icon: <AccountCircle />, type: 'form'},
        { name: 'search settings', icon: <Settings />, type: 'form' },
        { name: 'logout', icon: <PowerSettingsNew />, type: 'popup'},
        { name: 'delete account', icon: <DeleteForever/>, type: 'popup'}
    ];

    const handleNavigate = (form) => {
        navigateTo(form)
        openPopup(false);
    }

    return (
        <List>
            {
                itemList.map((item) => <ListItemButton 
                    onClick={() =>{
                        (item.type === 'form') ? (
                            handleNavigate(item.name)
                            ) : openPopup(item.name)
                    }} 
                    key={item.name}
                >
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name}/>
                </ListItemButton>)
            }
        </List>
    )
}
