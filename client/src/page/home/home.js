import { useEffect, useState } from 'react';

import './home.css';

import Loading from '../../common/component/loading/loading';
import Sidebar from '../../modules/sidebar/side-bar';

import SidebarContent from './component/sidebar/SidebarContent';
import MatchCardList from './component/content/matchCardList';

export default function Home() {
    const [isLoading, setLoading] = useState(false);

    return (
        <div className='home__container'>
            {(isLoading) && <Loading/>}
            <div className='home__sidebar__container'>
                <Sidebar 
                    header={{image: '', fullName: 'tater'}}
                    content={<SidebarContent />}
                />
            </div>
            <div className='home__content__container'>
                <div className='home__content'>
                    <MatchCardList setLoading={(status) => {setLoading(status)}}/>
                </div>
            </div>
        </div>
    )
}

