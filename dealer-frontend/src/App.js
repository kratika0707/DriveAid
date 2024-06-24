
import './App.css';
import DHome from './Components/DealerHome/DHome';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Navbar from './Components/Withoutlogin/Navbar/Navbar';
import Home from './Components/Withoutlogin/Home/Home';
import Register from './Components/Withoutlogin/Register/Register';
import DealerLogin from './Components/Withoutlogin/Register/DealerLogin';
function App() {
  return (

    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/dealer/register" element={<Register/>}/>
          <Route path="/dealer/login" element={<DealerLogin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
