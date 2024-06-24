import React from 'react'

const Booking = () => {
    
  return (
    <div className="container-fluid bg-secondary booking my-5 wow fadeInUp" id="booking" data-wow-delay="0.1s" style={{width:'100vw'}}>
        <div className="container">
            <div className="row gx-5">
                <div className="col-lg-6 py-5">
                    <div className="py-5">
                        <h1 className="text-white mb-4">Emergency Service Provider at your Location</h1>
                        <p className="text-white mb-0">  DriveAid offers rapid, on-site emergency assistance for any vehicle issues you encounter. Our skilled technicians come directly to you, and if any part is needed that the mechanic doesn't have, it will be delivered to ensure your vehicle is repaired on-site quickly and effectively.</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="bg-primary h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
                        <h1 className="text-white mb-4">Book A Service</h1>
                        <form>
                            <div className="row g-3">
                                {/* <div className="col-12 col-sm-6">
                                    <input type="text" className="form-control border-0" placeholder="Car Model" style={{height: '55px'}}/>
                                </div> */}
                                {/* <div className="col-12 col-sm-6">
                                    <input type="email" className="form-control border-0" placeholder="Your Email" style={{height: '55px'}}/>
                                </div> */}
                                <div className="col-12 col-sm-6">
                                    <input type="phone" className="form-control border-0" placeholder="Your Phone number" style={{height: '55px'}}/>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <input type="text" className="form-control border-0" placeholder="Car Model" style={{height: '55px'}}/>
                                </div>
                                {/* <div className="col-12 col-sm-6">
                                    <div className="date" id="date1" data-target-input="nearest">
                                        <input type="text"
                                            className="form-control border-0 datetimepicker-input"
                                            placeholder="Your Location" data-target="#date1" data-toggle="datetimepicker" style={{height: '55px'}}/>
                                    </div>
                                </div> */}
                                <div className="col-12">
                                    <textarea className="form-control border-0" placeholder="Your Issue" style={{height:'100px'}}></textarea>
                                </div>
                                <div className="col-12">
                                    <a href="/login" className=" btn btn-secondary w-100 py-3" type="submit">Book Now</a>
                                    {/* <a href="/login" className="button">Go to Google</a> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Booking
