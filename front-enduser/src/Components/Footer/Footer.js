import React from 'react';

import { Icon } from '@iconify/react'; // Make sure you have the iconify/react package installed
import facebookIcon from '@iconify/icons-mdi/facebook';
import twitterIcon from '@iconify/icons-mdi/twitter';
import instagramIcon from '@iconify/icons-mdi/instagram';
import linkedinIcon from '@iconify/icons-mdi/linkedin';
import youtubeIcon from '@iconify/icons-mdi/youtube';
import { Link as ScrollLink } from 'react-scroll';
const Footer = () => {
  return (
    <section  style={{backgroundColor:'black', borderTop:'1px solid grey', height:"280px", marginTop:"2%"}} >
        {/* <div className="container footer-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.5rem 0', overflowX: 'hidden' }}>
        <footer className="py-2" style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <div className="col-md-7 mt-0">
            <h1 style={{ color: 'red', fontWeight: '1500', paddingTop: '4px', fontSize: '1.5rem' }}>
              DriveAid
            </h1>
            <p style={{ margin: '0.5rem 0', fontSize: '1.15rem',color:'white' }}>
              Experience unparalleled roadside assistance with DriveAid. 
              From diagnostics to repairs, we're here to ensure a smooth journey, anytime, anywhere.
            </p>
          </div>

          <div className="footer-links col-md-3" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1%', fontSize: '1.1rem', marginBottom: '2%' }}>
            <a href="/about" className="nav-link text-uppercase p-0">
              <h5 style={{ marginRight: '2rem', color: 'white' }}>About us</h5>
            </a>
            <a href="/services" className="nav-link text-uppercase p-0">
              <h5 style={{ marginLeft: '2rem', color: 'white' }}>Our services</h5>
            </a>
          </div>
        </footer>
      </div> */}

      {/* <footer className="d-flex flex-wrap justify-content-between align-items-center border-top"></footer> */}

      <div style={{ marginLeft:'7%', marginRight:'2%'}} >
      
      <footer className="" style={{ height: '3.5rem', display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: "4%" }}>
  <div>
    <a href="/about" className="nav-link text-uppercase p-0">
      <p style={{ color: 'white' }}>About us</p>
    </a>
    <p style={{ color: 'white' }}>DriveAid connects you with trusted, nearby mechanics and dealers for fast, reliable vehicle repairs.
       We ensure prompt service, real-time updates, and access to quality parts.
       Experience hassle-free vehicle care with DriveAid, getting you back on the road quickly and safely.</p>
  </div>
  <div className="footer-links  d-flex flex-row" style={{ justifyContent: 'flex-start', alignItems: 'center', fontSize: '1.1rem', marginBottom: '5%', marginTop: '5%' }}>
        <a href="/services" className="nav-link text-uppercase " style={{ marginRight: '10px' }}>
          <p style={{ color: 'white' }}>Our services</p>
        </a>
        <a className="nav-link text-uppercase p-0" style={{ marginRight: '10px' }}>
          <p style={{ color: 'white' }}>|</p>
        </a>
        <a href="/about" className="nav-link text-uppercase " style={{ marginRight: '10px' }}>
          <p style={{ color: 'white' }}>About Us</p>
        </a>
        <a className="nav-link text-uppercase p-0" style={{ marginRight: '10px' }}>
          <p style={{ color: 'white' }}>|</p>
        </a>
        <a href="/feedback" className="nav-link text-uppercase ">
          <p style={{ color: 'white' }}>Feedback</p>
        </a>
        <div className="d-flex align-items-end" style={{ justifyContent:'right',color: 'white', fontSize: '1rem', marginTop: 'auto',  marginLeft: '40%' }}>
        <p>© 2024 DriveAid | All Rights Reserved</p>
      </div>
      </div>
      
</footer>


      </div>
    </section>
  );
};

export default Footer;
