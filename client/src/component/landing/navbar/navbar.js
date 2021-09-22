import { Link } from 'react-router-dom'

import './navbar.css'
import logo from '../../../assets/logo.png'

export default function Navbar({openLoginForm}) {
    return (
        <div className="Navbar">
            <div className="logo">
                <img src={logo} alt="logo"/>
                <p>Cosmitto</p>
            </div>
            <nav className="navigator">
                <ul>
                    <li><Link to="/product">Product</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/policies">Policies</Link></li>
                    <li><Link to="/services">Services</Link></li>
                </ul>
            </nav>
            <button className="login" onClick={openLoginForm}>Login</button>
        </div>
    )
}
