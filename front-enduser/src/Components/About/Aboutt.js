import React from 'react';
import { Icon } from '@iconify/react';
import arrowRight from '@iconify-icons/tabler/arrow-right';


const Aboutt = () => {
    console.log("About")
  return (
    <>
    <section id="about" >
      <div style={{ overflow: 'hidden' }}>
        <div className="container-fluid border-bottom" >
          <div style={{marginLeft:'2%', marginRight:'2%'}}>
            <div className="row align-items-center">
              <div className="col-md-6 padding-medium pe-5 border-end">
                
                <p className="header-top mb-3">Why choose us</p>
                <h2 className="display-4">always remember DriveAid for your car</h2>
              </div>
              <div className="col-md-6 padding-medium-2 ps-md-5">
                <p  style={{color:'black', fontSize:'1.1rem'}}>DriveAid connects customers with trusted, nearby mechanics and dealers for fast, reliable vehicle repairs. 
                  We ensure prompt service, real-time updates, and access to quality parts. 
                  Experience hassle-free vehicle care with DriveAid, getting you back on the road quickly and safely.
                </p>
                <a href="/about" className="btn  ms-5 mt-3" style={{backgroundColor:'rgb(234, 66, 43)', color:'white', fontSize:'1.25rem',fontWeight:'500', padding:'10px 25px', borderRadius:'25px' }}>
                  ABOUT US
                  <Icon icon={arrowRight} className="arrow-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    </>
  )
}

export default Aboutt
