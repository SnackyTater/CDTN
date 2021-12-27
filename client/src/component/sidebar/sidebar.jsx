import { Avatar, IconButton } from '../';
import { Home } from '@mui/icons-material';

import './sidebar.scss';

export default function SideBar({header, content}) {
    const {image, fullName} = header;

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <a className='sidebar__header__nav' href={'/profile'}>
                    <Avatar image={image}/>
                    <span>{fullName}</span>
                </a>
                <a className='sidebar__header__nav' href={'/home'}>
                    <IconButton 
                        icon={<Home/>}
                    />
                </a>
            </div>
            <div className='sidebar__content'>
                {content}
            </div>
        </div>
    )
}
