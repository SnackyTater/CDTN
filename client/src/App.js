import Navbar from './component/Navbar/navbar'

import './App.css'
import banner from './assets/785491.gif'


function App() {
    return (
        <div className="App">
            <header className="nav-holder">
                <Navbar/>
            </header>
            <div className="banner">
                <div className="signup-holder">
                    <p>Swipe right</p>
                    <a href="#"><button>Signup</button></a>
                </div>
            </div>
        </div>
    )
}

export default App; 