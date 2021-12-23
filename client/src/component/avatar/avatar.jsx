import { Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';

export default function avatarIcon({image, config, color}) {
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
