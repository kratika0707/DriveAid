import React from 'react'
import im1 from '../assets/carousel-1.png';
import im2 from '../assets/carousel-2.png';
import im3 from '../assets/carousel-bg-1.jpg';
import im4 from '../assets/carousel-bg-2.jpg';
const Carousel = () => {
  return (
    <div className="container-fluid p-0 mb-5" >
        <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="w-100" src={im3} alt="Image"/>
                    <div className="carousel-caption d-flex align-items-center">
                        <div className="container">
                            <div className="row align-items-center justify-content-center justify-content-lg-start">
                                <div className="col-10 col-lg-7 text-center text-lg-start">
                                    {/* <h6 className="text-white text-uppercase mb-3 animated slideInDown">// DriveAid //</h6> */}
                                    <h1 className="display-3 text-white mb-4 pb-3 animated slideInDown">DriveAid: Your Trusted Road Companion</h1>
                                    </div>
                                {/* <div className="col-lg-5 d-none d-lg-flex animated zoomIn">
                                    <img className="img-fluid" src={im1} alt=""/>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="w-100" src={im4} alt="Image"/>
                    <div className="carousel-caption d-flex align-items-center">
                        <div className="container">
                            <div className="row align-items-center justify-content-center justify-content-lg-start">
                            <div className="col-10 col-lg-7 text-center text-lg-start">
                                    {/* <h6 className="text-white text-uppercase mb-3 animated slideInDown">// DriveAid //</h6> */}
                                    <h1 className="display-3 text-white mb-4 pb-3 animated slideInDown">DriveAid: Your Trusted Road Companion</h1>
                                    </div>
                                {/* <div className="col-lg-5 d-none d-lg-flex animated zoomIn">
                                    <img className="img-fluid" src={im2} alt=""/>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
  )
}

export default Carousel
