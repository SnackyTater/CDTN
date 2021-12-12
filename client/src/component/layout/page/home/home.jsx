import { useState, useEffect} from 'react';
import { useHistory } from 'react-router';

import Card from '../../../common/card/card';

import './home.css';

export default function Home() {
    const [message] = useState(undefined)
    const [image] = useState("https://images-ssl.gotinder.com/614c0042ce39c601005fa4fc/172x216_7edff9c9-42fc-4ec4-ba68-52cb0649362a.jpg");

    const [show, setShowNoti] = useState("matches");

    const history = useHistory();
    
    return (
        <div className="home-container">
            <div className="side-bar">
                <div className="home-nav">
                    <a className="home-nav__profile" onClick={() => {
                        history.push('/profile', {token: ''});
                    }}>
                        <div className="home-nav__profile-avatar" style={{ "backgroundImage": `url(${image})`, "backgroundPosition": "50% 50%", "backgroundSize": "auto 125.581%"}}/>
                        <p style={{"fontSize": "20px", "color": "white"}}>My profile</p>
                    </a>
                </div>
                <div className="notification-holder">
                    <div className="notification__button-holder">
                        <div className="notification__button">
                            <button onClick={() => {setShowNoti("matches")}}>matches</button>
                            {(show === "matches") ? <hr style={{'color': '#fd267a'}}/> : <hr></hr>}
                        </div>
                        <div className="notification__button">
                            <button onClick={() => {setShowNoti("messages")}}>message</button>
                            {(show === "messages") ? <hr style={{'color': '#fd267a'}}/> : <hr></hr>}
                        </div>
                    </div>
                    <div className="notification__content">
                        {(show === "messages")? <p className="notification__content-text">No message available</p> : <p className="notification__content-text">you don't seem to have any matches, try to get some by swiping right other user</p>}
                    </div>
                </div>
            </div>
            <div className="card-holder">
                <div className="card">
                    <Card/>
                </div>
            </div>
        </div>
    )
}
