import React from 'react';
import { Icon } from '@iconify/react';
import arrowRight from '@iconify-icons/tabler/arrow-right';
import logo from '../Assets/car4.jpg';
import '../Home/Home.css';

const Home = () => {
  return (
    <>
      <section id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'absolute', top: '20%', left: '5%', transform: 'translateY(-50%)', zIndex: '10' }}>
          <div className="row">
            <div className="col-md-6 text-left">
              <p className="header-top1 mb-4" style={{ display: 'inline' }}>DriveAid: Your Trusted Companion on the Road</p>
            </div>
          </div>
        </div>
        <img src={logo} alt="image" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '110%', objectFit: 'cover', zIndex: '0' }} />
      </section>
    </>
  );
};

export default Home;
