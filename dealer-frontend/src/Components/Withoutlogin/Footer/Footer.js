import React, { Component } from 'react';

class Footer extends Component {
    state = {}
    render() {
        return (


        //     <div>
        //     <nav className="navbar navbar-dark" style={{ height: "50px", borderTop: '1px solid black' }}>
        //       <div className="container-fluid d-flex justify-content-between align-items-center">
        //         <div className="d-flex align-items-center">
        //           <button type="button" className="btn" style={{ padding: '0 10px' }}>About Us</button>
        //           <span style={{ margin: '0 10px' }}>|</span>
        //           <button type="button" className="btn" style={{ padding: '0 10px' }}>Terms and Conditions</button>
        //           <span style={{ margin: '0 10px' }}>|</span>
        //           <button type="button" className="btn" style={{ padding: '0 10px' }}>Review</button>
        //         </div>
        //         <div className="d-flex align-items-center" style={{ color: 'black', fontSize: '1rem' }}>
        //           <p style={{ margin: 0, color: 'black', marginRight: '30px' }}>© 2024 DriveAid | All Rights Reserved</p>
        //         </div>
        //       </div>
        //     </nav>
        //   </div>
          
          

<section  style={{backgroundColor:'black', borderTop:'1px solid grey', height:"280px", marginTop:"2%", width:'100vw'}} >
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

      <div style={{ marginLeft:'5%', marginRight:'5%'}} >
      
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
        <div className="d-flex align-items-end" style={{ justifyContent:'right',color: 'white', fontSize: '1rem', marginTop: 'auto',  marginLeft: '30%' , marginBottom: '1%',}}>
        <p style={{ color: 'white' }}>© 2024 DriveAid | All Rights Reserved</p>
      </div>
      </div>
      
</footer>


      </div>
    </section>






        
               
        );
    }
}

export default Footer;