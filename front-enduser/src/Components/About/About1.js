import React from 'react'
import image from '../../Assets/car-service.jpg'
const About1 = () => {
    return (
        <>
            <div className="container1" style={{ position: 'relative', height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
                <img src={image} alt="car" style={{ position: 'absolute', top: 0, left: 0, height: '95%', width: '100vw', objectFit: 'cover', zIndex: '0' }} />

            </div>
            <div className="container-xxl py-5" id="about">
                <div >
                    <div className="row g-5"  style={{marginLeft:'5%', marginRight:'5%'}}>
                        <div style={{ top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', textAlign: 'center' }}>
                            <h1 className='about' style={{ color: '#0078d6', fontSize: '5vw' }}>About Us</h1>
                        </div>
                        <div >
                            <h2 style={{ width: 'auto', color: 'black', display: 'inline' }}>DriveAid</h2>
                            <h2 style={{ width: 'auto', color: 'black', display: 'inline' }}> Your Trusted Road Companion</h2>
                            <p style={{ paddingTop: '2%' }}>DriveAid connects you with trusted, nearby mechanics and dealers for fast, 
                                reliable vehicle repairs. We ensure prompt service, real-time updates, and access to quality parts. 
                                Experience hassle-free vehicle care with DriveAid, getting you back on the road quickly and safely</p>
                            <div className="row g-4 mb-3 pb-3">
                                <div className="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div className="d-flex">
                                        <div className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{ width: '45px', height: '45px' }}>
                                            <span className="fw-bold text-dark">01</span>
                                        </div>
                                        <div className="ps-3">
                                            <h6>Professional & Expert</h6>
                                            <span>Professional & trained mechanics for your service.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                                    <div className="d-flex">
                                        <div className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{ width: '45px', height: '45px' }}>
                                            <span className="fw-bold text-dark">02</span>
                                        </div>
                                        <div className="ps-3">
                                            <h6>Emergency Roadside Assistance</h6>
                                            <span>24/7 roadside assistance for breakdowns, flat tires, battery issues, and more.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                                    <div className="d-flex">
                                        <div className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{ width: '45px', height: '45px' }}>
                                            <span className="fw-bold text-dark">03</span>
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
        </>
    )
}

export default About1
