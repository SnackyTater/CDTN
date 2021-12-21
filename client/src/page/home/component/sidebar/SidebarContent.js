import {useState} from 'react';

import { Backdrop, CircularProgress } from '@mui/material'

import MatchesList from './matchesList';
import ChatList from './chatList';

export default function SidebarContent() {
    const [display, setDisplay] = useState('matches');
    const [isLoading, setLoading] = useState(true)

    const listSwitch = (display) =>{
        switch(display){
            case 'matches':
                return <MatchesList setLoading={(status) => {setLoading(status)}}/>
            case 'chats':
                return <ChatList setLoading={(status) => {setLoading(status)}}/>
            default:
                return null;
        }
    }

    return (
        <div className='sidebar__content'>
            <div style={{display: 'flex'}}>
                <button className='button' style={{flex: '1', margin: '0'}}
                    onClick={() => setDisplay('matches')}
                >
                    matches
                </button>
                <button className='button' style={{flex: '1', margin: '0'}}
                    onClick={() => setDisplay('chats')}
                >
                    messages
                </button>
            </div>
            <div style={{height: '100%', width: '100%'}}>
                <Backdrop
                    sx={{color: '#fff', width: '20vw', minWidth: '325px', height: 'inherit', top: '73px'}}
                    open={isLoading}
                >
                    <CircularProgress color='inherit'/>
                </Backdrop>
                {
                    listSwitch(display)
                }
            </div>
        </div>
    )
}
