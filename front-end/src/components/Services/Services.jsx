import React from 'react'
import s1 from '../assets/service-1.jpg';
import s2 from '../assets/service-2.jpg';
import s3 from '../assets/service-3.jpg';
import s4 from '../assets/batteryservice.jpg';
const Services = () => {
  return (
    <div className="container-xxl service py-5" id="services">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="text-primary text-uppercase">// Our Services //</h6>
                <h1 className="mb-5">Explore Our Services</h1>
            </div>
            <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s">
                <div className="col-lg-4">
                    <div className="nav w-100 nav-pills me-4">
                        <button className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4 active" data-bs-toggle="pill" data-bs-target="#tab-pane-1" type="button">
                            <i className="fa fa-car-side fa-2x me-3"></i>
                            <h4 className="m-0">Diagnostic Services</h4>
                        </button>
                        <button className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4" data-bs-toggle="pill" data-bs-target="#tab-pane-2" type="button">
                            <i className="fa fa-car fa-2x me-3"></i>
                            <h4 className="m-0">Battery Services</h4>
                        </button>
                        <button className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4" data-bs-toggle="pill" data-bs-target="#tab-pane-3" type="button">
                            <i className="fa fa-cog fa-2x me-3"></i>
                            <h4 className="m-0">Tires Replacement</h4>
                        </button>
                        <button className="nav-link w-100 d-flex align-items-center text-start p-4 mb-0" data-bs-toggle="pill" data-bs-target="#tab-pane-4" type="button">
                            <i className="fa fa-oil-can fa-2x me-3"></i>
                            <h4 className="m-0">Engine Services</h4>
                        </button>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="tab-content w-100">
                        <div className="tab-pane fade show active" id="tab-pane-1">
                            <div className="row g-4">
                                <div className="col-md-6" style={{minHeight: '400px'}}>
                                    <div className="position-relative h-100">
                                        <img className="position-absolute img-fluid w-100 h-100" src={s1}
                                            style={{objectFit: 'cover'}} alt=""/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="mb-3">DriveAid: Your Trusted Road Companion</h3>
                                    <p className="mb-4">When your vehicle shows signs of trouble, DriveAid offers immediate diagnostic services to identify and address the issue swiftly. Our expert technicians use advanced tools to pinpoint problems on the spot, ensuring quick and effective solutions to get you back on the road safely.</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Quality Servicing</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Expert Workers</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Modern Equipment</p>
                                    {/* <a href="" className="btn btn-primary py-3 px-5 mt-3">Read More<i className="fa fa-arrow-right ms-3"></i></a> */}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-2">
                            <div className="row g-4">
                                <div className="col-md-6" style={{minHeight: '400px'}}>
                                    <div className="position-relative h-100">
                                        <img className="position-absolute img-fluid w-100 h-100" src={s2}
                                            style={{objectFit: 'cover'}} alt=""/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="mb-3">DriveAid: Your Trusted Road Companion</h3>
                                    <p className="mb-4">When your battery fails you, DriveAid is here to rescue. Our swift-response team provides on-the-spot battery testing, jump-starts, and replacements, ensuring you're never stranded due to a dead battery. With DriveAid, get back on track swiftly and with confidence, even in the most unexpected situations.</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Quality Servicing</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Expert Workers</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Modern Equipment</p>
                                    {/* <a href="" className="btn btn-primary py-3 px-5 mt-3">Read More<i className="fa fa-arrow-right ms-3"></i></a> */}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-3">
                            <div className="row g-4">
                                <div className="col-md-6" style={{minHeight: '400px'}}>
                                    <div className="position-relative h-100">
                                        <img className="position-absolute img-fluid w-100 h-100" src={s3}
                                            style={{objectFit: 'cover'}}alt=""/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="mb-3">DriveAid: Your Trusted Road Companion</h3>
                                    <p className="mb-4">Don't let a flat tire derail your journey. DriveAid offers rapid-response tire services, including tire changes, repairs, and replacements, right at your location. Our skilled technicians are available 24/7 to get you back on the road quickly and safely, ensuring minimal disruption to your travel plans.</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Quality Servicing</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Expert Workers</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Modern Equipment</p>
                                    {/* <a href="" className="btn btn-primary py-3 px-5 mt-3">Read More<i className="fa fa-arrow-right ms-3"></i></a> */}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-4">
                            <div className="row g-4">
                                <div className="col-md-6" style={{minHeight: '400px'}}>
                                    <div className="position-relative h-100">
                                        <img className="position-absolute img-fluid w-100 h-100" src={s4}
                                            style={{objectFit: 'cover'}} alt=""/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="mb-3">DriveAid: Your Trusted Road Companion</h3>
                                    <p className="mb-4">When your engine is in distress, trust DriveAid to provide swift and efficient assistance. Our expert mechanics are equipped to handle urgent engine repairs, diagnostics, and troubleshooting, ensuring you're back on the road safely in no time.</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Quality Servicing</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Expert Workers</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Modern Equipment</p>
                                    {/* <a href="" className="btn btn-primary py-3 px-5 mt-3">Read More<i className="fa fa-arrow-right ms-3"></i></a> */}
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

export default Services
