import './style.css'
import logo from '../../assets/logo.png'

function Navbar({openLoginForm}) {
    return (
        <div className="Navbar">
            <div className="logo">
                <img src={logo} alt="logo"/>
                <p>Cosmitto</p>
            </div>
            <nav className="navigator">
                <ul>
                    <li><a href="/">Product</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Policies</a></li>
                    <li><a href="/">Services</a></li>
                </ul>
            </nav>
            <button className="login" onClick={openLoginForm}>Login</button>
        </div>
    )
}

export default Navbar; 