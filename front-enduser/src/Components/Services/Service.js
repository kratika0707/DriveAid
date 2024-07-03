import React from 'react';
import image from '../Assets/pexels-olly-3807277.jpg';
import s1 from '../Assets/service1.jpg';
import s2 from '../Assets/service-2.jpg';
import s3 from '../Assets/service3.jpeg';
import s4 from '../Assets/service4.webp';

const Service = () => {
  return (
    <>
      <div id='service'>
        <div className="container1" style={{ position: 'relative', height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
          <img src={image} alt="car" style={{ position: 'absolute', top: 0, left: 0, height: '90%', width: '100vw', objectFit: 'cover', zIndex: '0' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '1', padding: '20px', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <h1 className='about' style={{ color: 'white', fontSize: '5vw' }}>Our Services</h1>
          </div>
        </div>

        <div className="container-xxl service py-5" id="services">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="mb-5">Explore Our Services</h1>
            </div>
            <div className="container">
              <div className="row g-4 wow" data-wow-delay="0.3s">
                <div className="col-lg-12">
                  <div className="w-100">
                    <div id="service-1" className="row g-4 align-items-center">
                      <div className="col-md-6">
                        <div className="position-relative h-100">
                          <img className="img-fluid w-100" src={s1} style={{ objectFit: 'cover', minHeight: '70vh', maxHeight: '90vh' }} alt="Diagnostic Services" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h2 className="mb-3">Diagnostic Services</h2>
                        <p className="mb-4">When your vehicle shows signs of trouble, DriveAid offers immediate diagnostic services to identify and address the issue swiftly. Our expert technicians use advanced tools to pinpoint problems on the spot, ensuring quick and effective solutions to get you back on the road safely.</p>
                      </div>
                    </div>

                    <div id="service-2" className="row g-4 align-items-center">
                      <div className="col-md-6 order-md-2">
                        <div className="position-relative h-100">
                          <img className="img-fluid w-100" src={s2} style={{ objectFit: 'cover', minHeight: '70vh', maxHeight: '70vh' }} alt="Battery Services" />
                        </div>
                      </div>
                      <div className="col-md-6 order-md-1">
                        <h2 className="mb-3">Battery Services</h2>
                        <p className="mb-4">When your battery fails you, DriveAid is here to rescue. Our swift-response team provides on-the-spot battery testing, jump-starts, and replacements, ensuring you're never stranded due to a dead battery. With DriveAid, get back on track swiftly and with confidence, even in the most unexpected situations.</p>
                      </div>
                    </div>

                    <div id="service-3" className="row g-4 align-items-center">
                      <div className="col-md-6">
                        <div className="position-relative h-100">
                          <img className="img-fluid w-100" src={s3} style={{ objectFit: 'cover', minHeight: '70vh', maxHeight: '90vh' }} alt="Tire Services" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h2 className="mb-3">Tire Services</h2>
                        <p className="mb-4">Don't let a flat tire derail your journey. DriveAid offers rapid-response tire services, including tire changes, repairs, and replacements, right at your location. Our skilled technicians are available 24/7 to get you back on the road quickly and safely, ensuring minimal disruption to your travel plans.</p>
                      </div>
                    </div>

                    <div id="service-4" className="row g-4 align-items-center">
                      <div className="col-md-6 order-md-2">
                        <div className="position-relative h-100">
                          <img className="img-fluid w-100" src={s4} style={{ objectFit: 'cover', minHeight: '70vh', maxHeight: '90vh' }} alt="Engine Services" />
                        </div>
                      </div>
                      <div className="col-md-6 order-md-1">
                        <h2 className="mb-3">Engine Services</h2>
                        <p className="mb-4">When your engine is in distress, trust DriveAid to provide swift and efficient assistance. Our expert mechanics are equipped to handle urgent engine repairs, diagnostics, and troubleshooting, ensuring you're back on the road safely in no time.</p>
                      </div>
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

export default Service;
