import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import '../Navbar/Navbar.css';

const Navbar = () => {
    const { authState, logout, mechauthState, mechlogout } = useContext(AuthContext);
    function handledeallogout(){
        logout();
        window.location.href='/'
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {!authState.isAuthenticated && !mechauthState.isAuthenticated ? (
                <div className="container-fluid">
                    <Link className="navbar-brand ms-3" to="/" style={{ fontWeight: '800', fontSize: '2rem' }}>DriveAid</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse me-5" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link active me-5" aria-current="page" to="/" style={{ fontWeight: '500', fontSize: '1.25rem', color: 'black' }}>Home</Link>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle me-5" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: '500', fontSize: '1.25rem', color: 'black' }}>Login</a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/dealer/login">Dealer</Link></li>
                                    <li><Link className="dropdown-item" to="/mechanic/login">Mechanic</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container-fluid">
                    {authState.isAuthenticated && (
                        <>
                            <Link className="navbar-brand ms-3" to={`/dealer/${authState.dealerId}`} style={{ fontWeight: '800', fontSize: '2rem' }}>DriveAid</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div>
                                <Link to={`/dealer/notifications/${authState.dealerId}`}>Notifications</Link>
                            </div>
                            <div className="collapse navbar-collapse me-5" id="navbarNavAltMarkup">
                                <div className="navbar-nav ms-auto">
                                    <Link className="nav-link active me-5" aria-current="page" to={`/dealer/${authState.dealerId}`} style={{ fontWeight: '500', fontSize: '1.25rem', color: 'black' }}>Home</Link>
                                    <button className="btn btn-primary me-5" onClick={handledeallogout}>Logout</button>
                                </div>
                            </div>
                        </>
                    )}
                    {mechauthState.isAuthenticated && (
                        <>
                            <Link className="navbar-brand ms-3" to={`/mechanic/${mechauthState.mechanicId}`} style={{ fontWeight: '800', fontSize: '2rem' }}>DriveAid</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse me-5" id="navbarNavAltMarkup">
                                <div className="navbar-nav ms-auto">
                                    <Link className="nav-link active me-5" aria-current="page" to={`/mechanic/${mechauthState.mechanicId}`} style={{ fontWeight: '500', fontSize: '1.25rem', color: 'black' }}>Home</Link>
                                    <button className="btn btn-primary me-5" onClick={mechlogout}>Logout</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
