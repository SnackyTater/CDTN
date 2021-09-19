import './style.css'
import logo from '../../assets/logo.png'

function Navbar() {
    return (
        <div className="Navbar">
            <div className="logo">
                <img src={logo}/>
                <p>Cosmitto</p>
            </div>
            <nav className="navigator">
                <ul>
                    <li><a href="#">Product</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Policies</a></li>
                    <li><a href="#">Services</a></li>
                </ul>
            </nav>
            <a href="#" className="login"><button><p>Login</p></button></a>
        </div>
    )
}

export default Navbar; 