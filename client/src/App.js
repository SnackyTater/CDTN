import { useState } from 'react';

import Navbar from './component/navbar/navbar';
import Login from './component/login/login'
import './App.css'

function App() {
    const [isOpen, setIsOpen ] = useState(false);

    const openLoginForm = () => setIsOpen(true);
    const closeLoginForm = () => setIsOpen(false);

    return (
        <div className="App">
            <header className="nav-holder">
                <Navbar openLoginForm={openLoginForm}/>
            </header>
            <div className="banner">
                <div className="signup-holder">
                    <p>Swipe right</p>
                    <a href="/"><button>Signup</button></a>
                </div>
            </div>
            <Login isOpen={isOpen} closeLoginForm={closeLoginForm} />
        </div>
    )
}

export default App; 