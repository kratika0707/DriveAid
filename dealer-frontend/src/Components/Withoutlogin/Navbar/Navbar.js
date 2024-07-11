import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { FaBell } from 'react-icons/fa';  // Import the bell icon
import axios from 'axios';
import '../Navbar/Navbar.css';

const Navbar = () => {
    const { authState, logout, mechauthState, mechlogout } = useContext(AuthContext);
    const [unreadCount, setUnreadCount] = useState(0);
    const [dealer, setDealer] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (mechauthState.isAuthenticated) {
            setupWebSocket();
        }
    }, [mechauthState]);

    useEffect(() => {
        const fetchDealerDetails = async () => {
            if (authState.dealerId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/dealers/findbyId/${authState.dealerId}`);
                    setDealer(response.data);
                    console.log(response.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
                setError('Dealer ID is not set.');
            }
        };

        fetchDealerDetails();
    }, [authState.dealerId]);

    const setupWebSocket = () => {
        const ws = new WebSocket('ws://localhost:7000');

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'NEW_SERVICE_REQUEST' && message.payload.mechanicId === mechauthState.mechanicId) {
                setUnreadCount(prevCount => prevCount + 1);
            }
        };

        return () => ws.close();
    };

    const handleLogout = () => {
        logout();
        mechlogout();
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-expand-lg " style={{backgroundColor:'black', width:'100vw'}}>
            {!authState.isAuthenticated && !mechauthState.isAuthenticated ? (
                <div className="container-fluid">
                    <Link className="navbar-brand ms-3" to="/" style={{ fontWeight: '800', fontSize: '2rem', color: 'white', letterSpacing: '0.075rem' }}>DriveAid</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse me-5" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link active me-5" aria-current="page" to="/" style={{ fontWeight: '600', fontSize: '1.25rem', color: 'white' }}>Home</Link>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle me-5" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: '600', fontSize: '1.25rem', color: 'white' }}>Login</a>
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
                            <nav className="navbar navbar-expand-lg " style={{backgroundColor:'black'}}>
                                <div className="container-fluid">
                                    <Link className="navbar-brand text-uppercase" to={`/`} style={{ fontWeight: '750', fontSize: '2rem', color: 'white', letterSpacing: '0.075rem' }}>
                                        {dealer ? dealer.bname : 'Driveaid'}
                                    </Link>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                        <div className="navbar-nav ms-auto">
                                            <Link className="nav-link active" aria-current="page" to={`/`} style={{ fontWeight: '500', fontSize: '1.25rem', color: 'white', marginRight: '20px', marginLeft: '350px' }}>Home</Link>
                                            <Link className="nav-link" to={`/dealer/mechanicadd/${authState.dealerId}`} style={{ fontWeight: '500', fontSize: '1.25rem', color: 'white', marginRight: '20px' }}>Add Mechanics</Link>
                                            <Link className="nav-link" to={`/dealer/mechanics/${authState.dealerId}`} style={{ fontWeight: '500', fontSize: '1.25rem', color: 'white', marginRight: '20px' }}>Mechanics</Link>
                                            <Link className="nav-link" to={`/dealer/services/${authState.dealerId}`} style={{ fontWeight: '500', fontSize: '1.25rem', color: 'white', marginRight: '20px' }}>Services</Link>
                                            <Link className="nav-link" to={`/dealer/notifications/${authState.dealerId}`} style={{ position: 'relative', fontWeight: '500', fontSize: '1.25rem', color: 'white', marginRight: '20px' }}>
                                                <FaBell size={24} />
                                                {unreadCount > 0 && (
                                                    <span style={{
                                                        position: 'absolute',
                                                        top: '-10px',
                                                        right: '-10px',
                                                        background: 'red',
                                                        borderRadius: '50%',
                                                        color: 'white',
                                                        padding: '2px 6px',
                                                        fontSize: '12px'
                                                    }}>
                                                        {unreadCount}
                                                    </span>
                                                )}
                                            </Link>
                                            <div className="dropdown" style={{ position: 'relative', marginLeft: '10px', marginTop: '0.5%' }}>
                                                <i
                                                    className="bi bi-person-circle profile-icon"
                                                    id="dropdownMenuButton"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                    style={{ fontSize: '2rem', cursor: 'pointer' }} // Ensuring the icon is clickable and sized properly
                                                ></i>
                                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton" style={{ border: '1px solid black' }}>
                                                    <Link className="dropdown-item" to={`/dealer/profile/${authState.dealerId}`} style={{ fontSize: '1.15rem', color: 'black', borderBottom: '1px solid black', fontWeight: '400' }}>
                                                        View Profile
                                                    </Link>
                                                    <button className="dropdown-item" style={{ fontSize: '1.15rem', color: 'black', fontWeight: '400' }} onClick={handleLogout}>
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </>
                    )}
                    {mechauthState.isAuthenticated && (
                        <>
                            <nav className="navbar navbar-expand-lg " style={{backgroundColor:'black'}}>
                                <div className="container-fluid">
                                    <Link className="navbar-brand text-uppercase" to="/" style={{ fontWeight: '800', fontSize: '2rem', color: "white", letterSpacing: '0.075rem' }}>
                                        DriveAid
                                    </Link>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                        <div className="navbar-nav ms-auto d-flex align-items-center">
                                            <Link className="nav-link active" aria-current="page" to={`/`} style={{ fontWeight: '500', fontSize: '1.25rem', color: 'white', marginRight: '20px', marginLeft:'580px' }}>
                                                Home
                                            </Link>
                                            <Link className="nav-link active" to={`/mechanic/servicehistory/${mechauthState.mechanicId}`} style={{ fontWeight: '500', fontSize: '1.25rem', color: 'white', marginRight: '20px' }}>
                                                Service History
                                            </Link>
                                            <Link className="nav-link" to={`/mechanic/notifications/${mechauthState.mechanicId}`} style={{ position: 'relative', fontWeight: '500', fontSize: '1.25rem', color: 'white', marginRight: '20px' }}>
                                                <FaBell size={24} />
                                                {unreadCount > 0 && (
                                                    <span style={{
                                                        position: 'absolute',
                                                        top: '-10px',
                                                        right: '-10px',
                                                        background: 'red',
                                                        borderRadius: '50%',
                                                        color: 'white',
                                                        padding: '2px 6px',
                                                        fontSize: '12px'
                                                    }}>
                                                        {unreadCount}
                                                    </span>
                                                )}
                                            </Link>
                                            <div className="dropdown" style={{ position: 'relative', marginLeft: '10px', marginTop: '0.5%' }}>
                                                <i
                                                    className="bi bi-person-circle profile-icon"
                                                    id="dropdownMenuButton"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                    style={{ fontSize: '2rem', cursor: 'pointer' }} // Ensuring the icon is clickable and sized properly
                                                ></i>
                                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton" style={{ border: '1px solid black' }}>
                                                    <Link className="dropdown-item" to={`/mechanic/profile/${mechauthState.mechanicId}`} style={{ fontSize: '1.15rem', color: 'black', borderBottom: '1px solid black', fontWeight: '400' }}>
                                                        View Profile
                                                    </Link>
                                                    <button className="dropdown-item" style={{ fontSize: '1.15rem', color: 'black', fontWeight: '400' }} onClick={handleLogout}>
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
