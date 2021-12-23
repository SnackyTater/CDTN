import React from 'react';
import {ListItem, ListItemAvatar, ListItemText} from '@mui/material';

import CustomAvatar from '../../../../../common/component/avatar-icon/avatar-icon';

export default function listItem({secondaryAction, mainText, subText, avatar}) {
    return (
        <ListItem
            secondaryAction={secondaryAction}
        >
            <ListItemAvatar>
                <CustomAvatar 
                    image={avatar} 
                    config={{bgColor: '#fff'}}
                    color={'white'}
                />
            </ListItemAvatar>
            <ListItemText 
                primary={mainText}
                secondary={subText}
                sx={{
                    color: 'black'
                }}
            />
        </ListItem>
    )
}
