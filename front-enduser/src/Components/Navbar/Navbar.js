import React, { useState, useEffect,useContext } from 'react';
import { Icon } from '@iconify/react';
import menuHamburger from '@iconify-icons/system-uicons/menu-hamburger';
import Modal from 'react-modal';
import { Link as ScrollLink } from 'react-scroll';
import Login from '../Login/Login';
import { useSelector, useDispatch } from 'react-redux';

import { login,logout } from '../../Redux/Features/userslice';
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
      <nav className="navbar fixed-top navbar-expand-lg container-fluid p-4" style={{ height: '70px', justifyContent: 'center', backgroundColor: 'white' }}>
        <div className="container-fluid">
          <h1 style={{ color: '#ea422b', height: '50px', fontWeight: '1500', paddingTop: '12px' }}>
            DriveAid
          </h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" style={{ marginBottom: '25px' }}>
            <Icon icon={menuHamburger} className="hamburger-menu" style={{ color: '#ea422b', border: 'none' }} />
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{ backgroundColor: 'white' }}>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel" style={{ color: '#ea422b' }}>Menu</h5>
              <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav align-items-center justify-content-end justify-content-xxl-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link text-black text-uppercase mx-2 px-3 mb-2 mb-lg-0" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-black text-uppercase mx-2 px-3 mb-2 mb-lg-0" href="/history" >History</a>
                </li>
                <li className="nav-item">
                  <ScrollLink className="nav-link text-black text-uppercase mx-2 px-3 mb-2 mb-lg-0" to="service">Services</ScrollLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-black text-uppercase mx-2 px-3 mb-2 mb-lg-0" href="/feedback">Feedback</a>
                </li>
                <li className="nav-item">
                  <a href="/booking" className="btn btn-outline-primary mx-2 px-3 py-2" style={{ backgroundColor: '#ea422b' }}>
                    Service Request
                  </a>
                </li>
                {isAuthenticated ? (
                  <>
                  <li className="nav-item">
                  <a className="nav-link text-black text-uppercase mx-2 px-3 mb-2 mb-lg-0" href="/user/notification" >Notifications</a>
                </li>
                  <li className="nav-item">
                    <button onClick={handlelogout} className="btn btn-outline-primary mx-2 px-3 py-2" style={{ backgroundColor: '#ea422b' }}>
                      Logout
                    </button>
                  </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button onClick={() => setShowLoginModal(true)} className="btn btn-outline-primary mx-2 px-3 py-2" style={{ backgroundColor: '#ea422b' }}>
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
        <Login  />
      </Modal>
    </>
  );
};

export default Navbar;
