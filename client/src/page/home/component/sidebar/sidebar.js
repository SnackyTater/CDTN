import {useState} from 'react';

import { Backdrop, CircularProgress } from '@mui/material'

import MatchesList from './list/matchesList';

export default function SidebarContent() {
    const [isLoading, setLoading] = useState(true)

    return (
        <div className='sidebar__content'>
            <div style={{height: '100%', width: '100%'}}>
                <Backdrop
                    sx={{color: '#fff', width: '20vw', minWidth: '325px', height: 'inherit', top: '73px'}}
                    open={isLoading}
                >
                    <CircularProgress color='inherit'/>
                </Backdrop>
                <MatchesList setLoading={(status) => {setLoading(status)}}/>
            </div>
        </div>
    )
}
