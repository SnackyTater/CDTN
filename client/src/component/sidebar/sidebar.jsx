import { useHistory } from 'react-router-dom';
import { Avatar, IconButton } from '../';
import { Home } from '@mui/icons-material';

import './sidebar.scss';

export default function SideBar({header, content, children}) {
    const history = useHistory();
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <a className='sidebar__header__nav'
                    onClick={() => {history.push('/profile')}}
                >
                    <Avatar image={header?.info?.profileImage[0]?.imageURL}/>
                    <span>{header?.info?.fullName}</span>
                </a>
                <a className='sidebar__header__nav'
                    onClick={() => {history.push('/home')}}
                >
                    <IconButton 
                        icon={<Home/>}
                    />
                </a>
            </div>
            <div className='sidebar__content'>
                {content || children}
            </div>
        </div>
    )
}
