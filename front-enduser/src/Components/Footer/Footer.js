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
    <section id="footer"style={{backgroundColor:'white', borderTop:'1px solid grey'}} >
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

      <div className="container" >
      
        <footer className="d-flex   " style={{height:'3.5rem'}}>
        <div className="footer-links col-md-8" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '2%', fontSize: '1.1rem', marginBottom: '1%',marginRight:'1.5%' }}>
            <a href="/about" className="nav-link text-uppercase p-0">
              <p style={{ marginRight: '0.5rem', color: 'black' }}>About us</p>
            </a>
            <a href="/services" className="nav-link text-uppercase p-0">
              <p style={{ marginRight:'0.5rem',marginLeft: '0.5rem', color: 'black' }}>|</p>
            </a>
            <a href="/services" className="nav-link text-uppercase p-0">
              <p style={{ marginRight:'0.5rem',marginLeft: '0.5rem', color: 'black' }}>Our services</p>
            </a>
            <a href="/services" className="nav-link text-uppercase p-0">
              <p style={{ marginRight:'0.5rem',marginLeft: '0.5rem', color: 'black' }}>|</p>
            </a>
            <a href="/services" className="nav-link text-uppercase p-0">
              <p style={{ marginLeft: '0.5rem', color: 'black' }}>Feedback</p>
            </a>
          </div>
          <div className="d-flex" style={{justifyContent:'right', color:'black',fontSize:'1rem',marginTop:'1%'}}>
            <p>© 2024 DriveAid | All Rights Reserved</p>
          </div>
          {/* <div className="col-md-6 d-flex align-items-center justify-content-end">
            <p>© 2023 Designed By:
              <a href="https://templatesjungle.com/" className="website-link text-decoration-none" target="_blank" rel="noreferrer">
                <b>TemplatesJungle</b>
              </a>
            </p>
          </div> */}
        </footer>
      </div>
    </section>
  );
};

export default Footer;
