import { Link } from 'react-router-dom';

import Logo from '../../common/component/logo/logo';
import './navbar.css';

export default function Navbar({openLoginForm}) {
    return (
        <div className="navbar">
            <Logo/>
            <nav className="navbar__navigator">
                <ul>
                    <li><Link to="/product" className='navigator__button'>Product</Link></li>
                    <li><Link to="/about" className='navigator__button'>About</Link></li>
                    <li><Link to="/policies" className='navigator__button'>Policies</Link></li>
                    <li><Link to="/services"className='navigator__button'>Services</Link></li>
                </ul>
            </nav>
            <button className="navbar__login" onClick={openLoginForm}>Login</button>
        </div>
    )
}
