import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';
import menuHamburger from '@iconify-icons/system-uicons/menu-hamburger';
import Modal from 'react-modal';
import { Link as ScrollLink } from 'react-scroll';
import Login from '../Login/Login';
import { useSelector, useDispatch } from 'react-redux';
import { FaBell } from 'react-icons/fa';
import './Navbar.css';
import { login, logout } from '../../Redux/Features/userslice';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const userId = useSelector(state => state.user.userId);

  const dispatch = useDispatch();

  useEffect(() => {
    // Check login status from local storage or other persistent storage
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  // const handleLoginSuccess = (user) => {
  //   setIsLoggedIn(true);
  //   setShowLoginModal(false);
  //   console.log(user);
  //   localStorage.setItem('userId', user.id); // Save user ID to local storage
  // };

  const handlelogout = () => {
    setIsLoggedIn(false);
    dispatch(logout());
    window.location.href = '/'; // Redirect to home page after logout
  };


  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg container-fluid p-4" style={{ height: '70px', justifyContent: 'center', backgroundColor: 'black', paddingBottom: '7%' }}>
        <div className="container-fluid">
          <h1 style={{ color: 'white', height: '50px', fontWeight: '1500', paddingBottom: '5px' }}>
            DriveAid
          </h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" style={{ marginBottom: '25px' }}>
            <Icon icon={menuHamburger} className="hamburger-menu" style={{ color: 'white', border: 'none', }} />
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{ backgroundColor: 'black' }}>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel" style={{ color: 'white' }}>Menu</h5>
              <button type="button" className="btn-close btn-close-light text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav align-items-center justify-content-end justify-content-xxl-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link text-white text-uppercase mx-2 px-3 mb-2 mb-lg-0" style={{ fontSize: '1.15rem' }} aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white text-uppercase mx-2 px-3 mb-2 mb-lg-0" style={{ fontSize: '1.15rem' }} href="/feedback">Feedback</a>
                </li>
                <li className="nav-item">
                  <a href="/booking" className="nav-link text-white text-uppercase mx-2 px-3 mb-2 mb-lg-0" style={{ fontSize: '1.15rem' }}>
                    Service Request
                  </a>
                </li>
                {isAuthenticated ? (
                  <>
                    <a href={'/user/notification'}>
                      <FaBell size={30} style={{ color: 'white', position: 'relative', marginTop: '9%' }}>
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
                        </span>
                      </FaBell>
                    </a>

                    <div className="dropdown" style={{ position: 'relative', marginLeft: '10px' }}>
                      <i
                        className="bi bi-person-circle profile-icon"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>
                      <div className="dropdown-menu dropdown-menu-right dropdown-menu-custom" aria-labelledby="dropdownMenuButton" style={{ border: '1px solid black' }}>
                        <a className="dropdown-item" href="/user/history" style={{ fontSize: '1.15rem', color: 'black', borderBottom: '1px solid black', fontWeight: '400' }}>
                          Service History
                        </a>
                        <button className="dropdown-item" style={{ fontSize: '1.15rem', color: 'black', fontWeight: '400' }} onClick={handlelogout}>
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <li className="nav-item">
                    <button onClick={() => setShowLoginModal(true)} className="btn  mx-2 px-3 py-2" style={{ backgroundColor: 'black', color:'white', borderRadius:'20px', fontSize:'1.15rem', fontWeight:'500' }}>
                      Login
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Modal
        isOpen={showLoginModal}
        onRequestClose={() => setShowLoginModal(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <Login />
      </Modal>
    </>
  );
};

export default Navbar;
