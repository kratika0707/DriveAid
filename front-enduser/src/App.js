import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Aboutt from './Components/About/Aboutt';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import UserHome from './Components/Home/UserHome';
import About1 from './Components/About/About1';
import Service from './Components/Services/Service';
import Booking from './Components/Booking/Booking';
import Feedback from './Components/Feedback/Feedback';
import History from './Components/History/History';
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer';
import Logout from './Components/Login/Logout';
import Servicehis from './Components/History/Servicehis';

function App() {
  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route index element={<UserHome/>}/>
        <Route path="/about" element={<About1/>}/>
        <Route path='/services' element={<Service/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/feedback' element={<Feedback/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/footer' element={<Footer/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/history/service' element={<Servicehis/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    
    </>
  );
}

export default App;
