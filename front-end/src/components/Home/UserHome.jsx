import React from 'react'
import Carousel from '../Carousel/Carousel'
import Advertising from '../Advertising/Advertising'
import About from '../About/About'
import Facts from '../Facts/Facts'
import Services from '../Services/Services'
import Booking from '../Booking/Booking'
import Team from '../Team/Team'
import Testimonial from '../Testimonial/Testimonial'
import Footer from '../Footer/Footer'

const UserHome = () => {
  return (
    <>
    
        <Carousel/>
        <Advertising/>
        <About/>
          {/* <Facts/> */}
          <Services/>
          <Booking/>
          {/* <Team/> */}
          {/* <Testimonial/> */}
          <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </>
  )
}

export default UserHome
