import React from 'react'
import Home from './Home'
import Navbar from '../Navbar/Navbar'
import Aboutt from '../About/Aboutt'
import Details from '../Details/Details'
import Service from '../Services/Service'
import image from '../Assets/pexels-olly-3807277.jpg'
import Feedback from '../Feedback/Feedback'
const UserHome = () => {
  return (
    <>
        
      <Home/>
        <Aboutt/>

        <Details/>
        
        <Service/>
    </>
  )
}

export default UserHome
