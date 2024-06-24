import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Topbar from './components/topbar/Topbar'
import Navbar from './components/Navbar/Navbar'
import Carousel from './components/Carousel/Carousel'
import Advertising from './components/Advertising/Advertising'
import About from './components/About/About'
import Facts from './components/Facts/Facts'
import Services from './components/Services/Services'
import Booking from './components/Booking/Booking'
import Team from './components/Team/Team'
import Testimonial from './components/Testimonial/Testimonial'
import Footer from './components/Footer/Footer'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import UserHome from './components/Home/UserHome'
import Login from './components/Login/Login'
import History from './components/History/History'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      {/* <Topbar/> */}
      <BrowserRouter>
        <Navbar/>
        
        <Routes>
            <Route index element={<UserHome/>}/>
            <Route path="/" element={<UserHome/>}/>
            <Route path='/booking' element={<Booking/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/history' element={<History/>}/>
          {/* <Carousel/>
          <Advertising/>
          <About/>
          <Facts/>
          <Services/>
          <Booking/>
          <Team/>
          <Testimonial/>
          <Footer/>
          <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a> */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
