import React from 'react'
import abt from '../assets/about.jpg';
const About = () => {
  return (
    <div className="container-xxl py-5" id="about">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-6 pt-4" style={{minHeight:'400px'}}>
                    <div className="position-relative h-100 wow fadeIn" data-wow-delay="0.1s">
                        <img className="position-absolute img-fluid w-100 h-100" src={abt} style={{objectFit: 'cover'}} alt=""/>
                        {/* <div className="position-absolute top-0 end-0 mt-n4 me-n4 py-4 px-5" style={{background: 'rgba(0, 0, 0, .08)'}}>
                            <h1 className="display-4 text-white mb-0">15 <span className="fs-4">Years</span></h1>
                            <h4 className="text-white">Experience</h4>
                        </div> */}
                    </div>
                </div>
                <div className="col-lg-6">
                    <h6 className="text-primary text-uppercase">// About Us //</h6>
                    <h1 className="mb-4">DriveAid: Your Trusted Road Companion</h1>
                    <p className="mb-4">DriveAid connects you with trusted, nearby mechanics and dealers for fast, reliable vehicle repairs. We ensure prompt service, real-time updates, and access to quality parts. Experience hassle-free vehicle care with DriveAid, getting you back on the road quickly and safely</p>
                    <div className="row g-4 mb-3 pb-3">
                        <div className="col-12 wow fadeIn" data-wow-delay="0.1s">
                            <div className="d-flex">
                                <div className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{width: '45px' , height: '45px'}}>
                                    <span className="fw-bold text-secondary">01</span>
                                </div>
                                <div className="ps-3">
                                    <h6>Professional & Expert</h6>
                                    <span>Professional & trained mechanics for your service.</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                            <div className="d-flex">
                                <div className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{width: '45px', height: '45px'}}>
                                    <span className="fw-bold text-secondary">02</span>
                                </div>
                                <div className="ps-3">
                                    <h6>Emergency Roadside Assistance</h6>
                                    <span>24/7 roadside assistance for breakdowns, flat tires, battery issues, and more.</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                            <div className="d-flex">
                                <div className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{width: '45px', height: '45px'}}>
                                    <span className="fw-bold text-secondary">03</span>
                                </div>
                                <div className="ps-3">
                                    <h6>Parts Sourcing and Delivery</h6>
                                    <span>Access to a wide range of vehicle parts from verified vendors, with delivery to mechanics for timely repairs.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
