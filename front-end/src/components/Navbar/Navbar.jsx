import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';


const Navbar = () => {
    const [activeLink, setActiveLink] = useState('home');

    const handleSetActive = (link) => {
        setActiveLink(link);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
            <a href="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                <h2 className="m-0 text-primary"><i className="fa fa-car me-3"></i>DriveAid</h2>
            </a>
            <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                    <a href="/" className={`nav-item nav-link ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleSetActive('home')}>Home</a>
                    <ScrollLink to="about" className={`nav-item nav-link pointer-cursor ${activeLink === 'about' ? 'active' : ''}`} onClick={() => handleSetActive('about')} smooth={true} duration={3}>About</ScrollLink>
                    <ScrollLink to="services" className={`nav-item nav-link pointer-cursor ${activeLink === 'services' ? 'active' : ''}`} onClick={() => handleSetActive('services')} smooth={true} duration={3}>Services</ScrollLink>
                    {/* <div className="nav-item dropdown">
                        <a href="/" className={`nav-link dropdown-toggle ${activeLink === 'pages' ? 'active' : ''}`} onClick={() => handleSetActive('pages')} data-bs-toggle="dropdown">Pages</a>
                        <div className="dropdown-menu fade-up m-0">
                            <ScrollLink to="booking" className={`dropdown-item pointer-cursor ${activeLink === 'booking' ? 'active' : ''}`} onClick={() => handleSetActive('booking')} smooth={true} duration={3}>Booking</ScrollLink>
                            <ScrollLink to="team" className={`dropdown-item pointer-cursor ${activeLink === 'team' ? 'active' : ''}`} onClick={() => handleSetActive('team')} smooth={true} duration={3}>Technicians</ScrollLink>
                            <ScrollLink to="testimonial" className={`dropdown-item pointer-cursor ${activeLink === 'testimonial' ? 'active' : ''}`} onClick={() => handleSetActive('testimonial')} smooth={true} duration={3}>Testimonial</ScrollLink>
                        </div>
                    </div> */}
                </div>
                <a href="/booking" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Book a service<i className="fa fa-arrow-right ms-3"></i></a>
            </div>
        </nav>
    );
};

export default Navbar;
