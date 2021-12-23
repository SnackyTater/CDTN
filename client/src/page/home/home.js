import { useEffect, useState } from 'react';

import './home.css';

import Loading from '../../common/component/loading/loading';
import { Sidebar } from '../../component';
import Popup from '../../common/component/popup/popup';

import SidebarContent from './component/sidebar/SidebarContent';
import MatchCardList from './component/content/matchCardList';

export default function Home() {
    const [isLoading, setLoading] = useState(false);
    const [popup, setPopup] = useState({
        content: '',
        stastus: false
    });

    return (
        <div className='home__container'>
            {
                (isLoading) && <Loading/>
            }

            <div className='home__sidebar__container'>
                <Sidebar 
                    header={{
                        image: '', 
                        fullName: 'tater'
                    }}
                    content={
                        <SidebarContent setPopup={(config) => {setPopup(config)}}/>
                    }
                />
            </div>

            <div className='home__content__container'>
                <div className='home__content'>
                    <MatchCardList 
                        setLoading={(status) => {setLoading(status)}}
                    />
                </div>

                <div className='home__popup'>
                    <Popup 
                        isOpen={popup.stastus}
                        closePopup={() => {setPopup(false)}}
                        content={<div>aaaaaaa</div>}
                    />
                </div>
            </div>
        </div>
    )
}

