import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { FaBell } from 'react-icons/fa';  // Import the bell icon
import axios from 'axios';
import '../Navbar/Navbar.css';

const Navbar = () => {
    const { authState, logout, mechauthState, mechlogout } = useContext(AuthContext);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (mechauthState.isAuthenticated) {
            fetchUnreadNotifications();
            setupWebSocket();
        }
    }, [mechauthState]);

    const fetchUnreadNotifications = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/mechanic/${mechauthState.mechanicId}/notifications/unread`);
            setUnreadCount(response.data.unreadCount);
        } catch (error) {
            console.error('Error fetching unread notifications:', error);
        }
    };

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
                            <Link className="navbar-brand ms-3" to={`/`} style={{ fontWeight: '800', fontSize: '2rem' }}>DriveAid</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <Link className="nav-link active me-5" aria-current="page" to={`/`} style={{ fontWeight: '500', fontSize: '1.25rem', color: 'black' }}>Home</Link>
                            <div style={{marginLeft:'5%'}}>
                                <Link to={`/dealer/mechanicadd/${authState.dealerId}`}>Add mechanics</Link>
                            </div>
                            <div style={{marginLeft:'5%'}}>
                                <Link to={`/dealer/mechanics/${authState.dealerId}`}>Mechanics</Link>
                            </div>
                            <div style={{marginLeft:'5%'}}>
                                <Link to={`/dealer/services/${authState.dealerId}`}>Services</Link>
                            </div>
                            <Link to={`/dealer/notifications/${authState.dealerId}`}>
                                    <FaBell size={24} style={{ position: 'relative', marginLeft:'15%' }}>
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
                                    </FaBell>
                                </Link>
                            <div className="collapse navbar-collapse me-5" id="navbarNavAltMarkup">
                                <div className="navbar-nav ms-auto">
                                    
                                    <button className="btn btn-primary me-5" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </>
                    )}
                    {mechauthState.isAuthenticated && (
                        <>
                            <Link className="navbar-brand ms-3" to={`/`} style={{ fontWeight: '800', fontSize: '2rem' }}>DriveAid</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <Link  aria-current="page" to={`/`} style={{ fontWeight: '500', fontSize: '1.25rem', color: 'black' }}>Home</Link>
                            <div style={{marginLeft:'5%', marginRight:'5%'}}>
                                {/* <Link to={`/buy/${mechauthState.mechanicId}`}>Buy Parts</Link> */}
                                <Link to={`/buyparts/${mechauthState.mechanicId}`}>Buy Parts</Link>
                            </div>
                            <div>
                                <Link to={`/mechanic/notifications/${mechauthState.mechanicId}`}>
                                    <FaBell size={24} style={{ position: 'relative' }}>
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
                                    </FaBell>
                                </Link>
                            </div>
                            
                            <div className="collapse navbar-collapse me-5" id="navbarNavAltMarkup">
                                <div className="navbar-nav ms-auto">
                                    
                                    <button className="btn btn-primary me-5" onClick={handleLogout}>Logout</button>
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
