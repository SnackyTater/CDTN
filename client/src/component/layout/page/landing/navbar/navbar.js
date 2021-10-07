import { Link } from 'react-router-dom';

import Logo from '../../../../common/logo/logo';
import './navbar.css';

export default function Navbar({openLoginForm}) {
    return (
        <div className="Navbar">
            <Logo/>
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
