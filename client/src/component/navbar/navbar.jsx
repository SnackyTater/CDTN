import { Link } from 'react-router-dom';

import { Logo, DefaultButton } from '../';
import './navbar.scss';

export default function Navbar({openLoginForm, disableLogin, mode}) {
    return (
        <div className="navbar__container">
            <Logo mode={mode}/>
            <nav className={`navbar__navigator--${mode || 'dark'}`}>
                <ul>
                    <li><Link to="/product" >Product</Link></li>
                    <li><Link to="/about" >About</Link></li>
                    <li><Link to="/policies" >Policies</Link></li>
                    <li><Link to="/services" >Services</Link></li>
                </ul>
            </nav>
            {
                !disableLogin && <div className='navbar__navigator__button__container'>
                    <DefaultButton placeholder={'login'} onClick={openLoginForm}/>
                </div>
            }
        </div>
    )
}
