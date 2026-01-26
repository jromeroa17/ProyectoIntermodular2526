import { Link } from "react-router-dom"
import { ACCESS_TOKEN } from "../constants"
import "../styles/Navbar.css"

function Navbar() {
    const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN)

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">
                    Crear Personajes
                </Link>
            </div>

            <div className="navbar-right">
                    <>
                        <Link to="/" className="navbar-link">
                            Home
                        </Link>
                        <Link to="/panel-compartido" className="navbar-link">
                            Panel Compartido
                        </Link>
                        <Link to="/logout" className="navbar-link logout">
                            Logout
                        </Link>
                    </>
                    <>
                        <Link to="/login" className="navbar-link">
                            Login
                        </Link>
                        <Link to="/register" className="navbar-link">
                            Register
                        </Link>
                    </>
            </div>
        </nav>
    )
}

export default Navbar
