
import './App.css';
import DHome from './Components/DealerHome/DHome';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Navbar from './Components/Withoutlogin/Navbar/Navbar';
import Home from './Components/Withoutlogin/Home/Home';
import Register from './Components/Withoutlogin/Register/Register';
import DealerLogin from './Components/Withoutlogin/Register/DealerLogin';
import MechanicLogin from './Components/Withoutlogin/Register/MechanicLogin';
import MHome from './Components/MechanicHome/MHome';
import Notification from './Components/Notifications/Notification';
function App() {
  return (

    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/dealer/register" element={<Register/>}/>
          <Route path="/dealer/login" element={<DealerLogin/>}/>
          <Route path='/dealer/:dealerId' element={<DHome/>}/>
          <Route path='/mechanic/login' element={<MechanicLogin/>}/>
          <Route path='/mechanic/:mechanicId' element={<MHome/>}/>
          <Route path="/dealer/notifications/:dealerId" element={<Notification/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
