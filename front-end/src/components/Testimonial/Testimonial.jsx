import React from 'react'
import t1 from '../assets/testimonial-1.jpg';
import t2 from '../assets/testimonial-2.jpg';
import t3 from '../assets/testimonial-3.jpg';
import t4 from '../assets/testimonial-4.jpg';
const Testimonial = () => {
  return (
    <div className="container-xxl py-5 wow fadeInUp" id="testimonial" data-wow-delay="0.1s">
        <div className="container">
            <div className="text-center">
                <h6 className="text-primary text-uppercase">// Testimonial //</h6>
                <h1 className="mb-5">Our Clients Say!</h1>
            </div>
            <div className="owl-carousel testimonial-carousel position-relative ">
                <div className="testimonial-item text-center">
                    <img className="bg-light rounded-circle p-2 mx-auto mb-3" src={t1} style={{width: '80px', height: '80px'}} />
                    <h5 className="mb-0">Client Name</h5>
                    <p>Profession</p>
                    <div className="testimonial-text bg-light text-center p-4">
                    <p className="mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                    </div>
                </div>
                <div className="testimonial-item text-center">
                    <img className="bg-light rounded-circle p-2 mx-auto mb-3" src={t2} style={{width: '80px', height: '80px'}} />
                    <h5 className="mb-0">Client Name</h5>
                    <p>Profession</p>
                    <div className="testimonial-text bg-light text-center p-4">
                    <p className="mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                    </div>
                </div>
                <div className="testimonial-item text-center">
                    <img className="bg-light rounded-circle p-2 mx-auto mb-3" src={t3} style={{width: '80px', height: '80px'}} />
                    <h5 className="mb-0">Client Name</h5>
                    <p>Profession</p>
                    <div className="testimonial-text bg-light text-center p-4">
                    <p className="mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                    </div>
                </div>
                <div className="testimonial-item text-center">
                    <img className="bg-light rounded-circle p-2 mx-auto mb-3" src={t4} style={{width: '80px', height: '80px'}} />
                    <h5 className="mb-0">Client Name</h5>
                    <p>Profession</p>
                    <div className="testimonial-text bg-light text-center p-4">
                    <p className="mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testimonial
