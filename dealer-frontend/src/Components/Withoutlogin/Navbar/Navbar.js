import React from 'react'
import '../Navbar/Navbar.css'

const Navbar = () => {
    return (
        <>
             <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand ms-3" href="/" style={{ fontWeight: '800', fontSize: '2rem' }}>DriveAid</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse me-5" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <a className="nav-link active me-5" aria-current="page" href="/" style={{ fontWeight: '500', fontSize: '1.25rem', color: 'black' }}>Home</a>
                        {/* <a className="nav-link me-5" href="/" style={{ fontWeight: '500', fontSize: '1.25rem', color: 'black' }}>Features</a>
                        <a className="nav-link me-5" href="/" style={{ fontWeight: '500', fontSize: '1.25rem', color: 'black' }}>Pricing</a> */}
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle me-5" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: '500', fontSize: '1.25rem', color: 'black' }}>Login</a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/dealer/login">Dealer</a></li>
                                <li><a className="dropdown-item" href="#">Mechanic</a></li>
                                {/* <li><a className="dropdown-item" href="#">Vendor</a></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        </>
    )
}

export default Navbar
